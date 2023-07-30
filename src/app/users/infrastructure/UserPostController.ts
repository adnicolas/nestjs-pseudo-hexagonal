import { Body, Controller, Post } from '@nestjs/common';
import {
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
import { PostgresRoleRepository } from 'src/app/roles/infrastructure/PostgresRoleRepository';
import { PostgresUserRepository } from './PostgresUserRepository';
import { User } from '../domain/User';
import { FindUserByEmail } from '../application/FindUserByEmail';
import { UserPostDto } from '../domain/UserPostDto';
import { CreateUser } from '../application/CreateUser';

@Controller(userController)
export class UserPostController {
	constructor(
		private readonly repository: PostgresUserRepository,
		private readonly roleRepository: PostgresRoleRepository
	) {}

	@Post()
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
		const user: User = await new FindUserByEmail(this.repository).run(
			dto.email
		);
		if (!user) {
			const hash: string = await bcrypt.hash(dto.password, passwordSaltRounds);
			dto.password = hash;
			await new CreateUser(this.repository, this.roleRepository).run(dto);
		}
	}
}
