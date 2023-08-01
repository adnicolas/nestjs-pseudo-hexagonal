import {
	ClassSerializerInterceptor,
	Controller,
	Get,
	NotFoundException,
	Param,
	UseInterceptors
} from '@nestjs/common';
import { usersApiTag, userController } from '../users.constants';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../domain/User';
import { PostgresUserRepository } from './PostgresUserRepository';
import { FindUserById } from '../application/FindUserById';

@Controller(userController)
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
		const user: User | null = await new FindUserById(this.repository).run(id);
		if (!user) {
			throw new NotFoundException();
		}
		return user;
	}
}
