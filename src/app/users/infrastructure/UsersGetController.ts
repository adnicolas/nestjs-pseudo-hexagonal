import {
	ClassSerializerInterceptor,
	Controller,
	Get,
	UseInterceptors
} from '@nestjs/common';
import { usersApiTag, usersController } from '../users.constants';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../domain/User';
import { FindAllUsers } from '../application/FindAllUsers';
import { PostgresUserRepository } from './PostgresUserRepository';

@Controller(usersController)
export class UsersGetController {
	constructor(private readonly repository: PostgresUserRepository) {}
	@Get()
	@UseInterceptors(ClassSerializerInterceptor)
	@ApiTags(usersApiTag)
	@ApiOperation({ summary: 'Returns all the users' })
	@ApiResponse({
		description: 'User records',
		type: User,
		isArray: true
	})
	public async findAll(): Promise<User[]> {
		const users: User[] = await new FindAllUsers(this.repository).run();
		return users;
	}
}
