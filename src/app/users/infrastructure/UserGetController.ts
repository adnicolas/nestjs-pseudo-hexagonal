import {
	ClassSerializerInterceptor,
	Controller,
	Get,
	NotFoundException,
	Param,
	UseInterceptors
} from '@nestjs/common';
import { usersApiTag, usersController } from '../users.constants';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../domain/User';
import { FindAllUsers } from '../application/FindAllUsers';
import { PostgresUserRepository } from './PostgresUserRepository';
import { FindUserById } from '../application/FindUserById';

@Controller(usersController)
export class UserGetController {
	constructor(private readonly repository: PostgresUserRepository) {}
	@Get(':id')
	@UseInterceptors(ClassSerializerInterceptor)
	@ApiTags(usersApiTag)
	@ApiOperation({ summary: 'Returns a user' })
	@ApiResponse({
		description: 'User record',
		type: User,
		isArray: false
	})
	public async findById(@Param('id') id: string): Promise<User> {
		const user: User = await new FindUserById(this.repository).run(id);
		if (!user) {
			throw new NotFoundException();
		}
		return user;
	}
}
