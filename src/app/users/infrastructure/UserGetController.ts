import {
	ClassSerializerInterceptor,
	Controller,
	Get,
	NotFoundException,
	Param,
	UseGuards,
	UseInterceptors
} from '@nestjs/common';
import { usersApiTag, userController } from '../users.constants';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger';
import { User } from '../domain/User';
import { PostgresUserRepository } from './PostgresUserRepository';
import { FindUserById } from '../application/FindUserById';
import { AuthGuard } from '../../auth/infrastructure/AuthGuard';

@ApiBearerAuth()
@Controller(userController)
export class UserGetController {
	constructor(private readonly repository: PostgresUserRepository) {}
	@Get(':id')
	@UseGuards(AuthGuard)
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
