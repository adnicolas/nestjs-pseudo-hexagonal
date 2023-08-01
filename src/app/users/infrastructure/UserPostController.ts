import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiBody,
	ApiCreatedResponse,
	ApiOperation,
	ApiTags
} from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import {
	passwordSaltRounds,
	userController,
	usersApiTag
} from '../users.constants';
import { PostgresRoleRepository } from '../../roles/infrastructure/PostgresRoleRepository';
import { PostgresUserRepository } from './PostgresUserRepository';
import { User } from '../domain/User';
import { FindUserByEmail } from '../application/FindUserByEmail';
import { UserPostDto } from '../domain/UserPostDto';
import { CreateUser } from '../application/CreateUser';
import { AuthGuard } from '../../auth/infrastructure/AuthGuard';
import { Roles } from '../../roles/infrastructure/roles.decorator';
import { RoleEnum } from '../../roles/domain/Role.enum';

@ApiBearerAuth()
@Controller(userController)
export class UserPostController {
	constructor(
		private readonly repository: PostgresUserRepository,
		private readonly roleRepository: PostgresRoleRepository
	) {}

	@Post()
	@UseGuards(AuthGuard)
	@Roles(RoleEnum.ADMIN)
	@ApiTags(usersApiTag)
	@ApiOperation({ summary: 'Creates a user' })
	@ApiBody({
		required: true,
		type: UserPostDto,
		isArray: false
	})
	@ApiCreatedResponse({
		status: 201,
		description: 'User created successfully'
	})
	public async create(@Body() dto: UserPostDto): Promise<void> {
		const user: User | null = await new FindUserByEmail(this.repository).run(
			dto.email
		);
		if (!user) {
			const hash: string = await bcrypt.hash(dto.password, passwordSaltRounds);
			dto.password = hash;
			await new CreateUser(this.repository, this.roleRepository).run(dto);
		}
	}
}
