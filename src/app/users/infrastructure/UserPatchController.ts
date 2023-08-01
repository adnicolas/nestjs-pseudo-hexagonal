import {
	Body,
	Controller,
	NotFoundException,
	Param,
	Patch
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import {
	passwordSaltRounds,
	userController,
	usersApiTag
} from '../users.constants';
import { PostgresRoleRepository } from 'src/app/roles/infrastructure/PostgresRoleRepository';
import { PostgresUserRepository } from './PostgresUserRepository';
import { User } from '../domain/User';
import { UserPatchDto } from '../domain/UserPatchDto';
import { UpdateUser } from '../application/UpdateUser';
import { FindUserById } from '../application/FindUserById';

@Controller(userController)
export class UserPatchController {
	constructor(
		private readonly repository: PostgresUserRepository,
		private readonly roleRepository: PostgresRoleRepository
	) {}

	@Patch(':id')
	@ApiTags(usersApiTag)
	@ApiOperation({ summary: 'Updates a user' })
	@ApiBody({
		required: true,
		type: UserPatchDto,
		isArray: false
	})
	@ApiOkResponse({
		status: 200,
		description: 'User updated successfully'
	})
	public async update(
		@Param('id') id: string,
		@Body() dto: UserPatchDto
	): Promise<void> {
		const user: User | null = await new FindUserById(this.repository).run(id);
		if (!user) {
			throw new NotFoundException();
		}
		if (dto.password) {
			const hash: string = await bcrypt.hash(dto.password, passwordSaltRounds);
			dto.password = hash;
		}
		await new UpdateUser(this.repository, this.roleRepository).run(dto, user);
	}
}
