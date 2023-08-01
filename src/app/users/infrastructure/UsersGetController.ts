import {
	ClassSerializerInterceptor,
	Controller,
	Get,
	UseGuards,
	UseInterceptors
} from '@nestjs/common';
import { usersApiTag, usersController } from '../users.constants';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger';
import { User } from '../domain/User';
import { FindAllUsers } from '../application/FindAllUsers';
import { PostgresUserRepository } from './PostgresUserRepository';
import { AuthGuard } from '../../auth/infrastructure/AuthGuard';
import { Roles } from '../../roles/infrastructure/roles.decorator';
import { RoleEnum } from 'src/app/roles/domain/Role.enum';

@ApiBearerAuth()
@Controller(usersController)
export class UsersGetController {
	constructor(private readonly repository: PostgresUserRepository) {}
	@Get()
	@UseInterceptors(ClassSerializerInterceptor)
	@UseGuards(AuthGuard)
	@Roles(RoleEnum.ADMIN)
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
