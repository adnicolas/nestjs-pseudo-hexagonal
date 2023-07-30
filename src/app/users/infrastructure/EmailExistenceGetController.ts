import { Controller, Get, Query } from '@nestjs/common';
import {
	ApiOkResponse,
	ApiOperation,
	ApiQuery,
	ApiTags
} from '@nestjs/swagger';
import { PostgresUserRepository } from './PostgresUserRepository';
import { User } from '../domain/User';
import { usersApiTag, usersController } from '../users.constants';
import { FindUserByEmail } from '../application/FindUserByEmail';

@Controller(usersController)
export class EmailExistenceGetController {
	constructor(private readonly repository: PostgresUserRepository) {}

	@Get('existence')
	@ApiTags(usersApiTag)
	@ApiOperation({ summary: 'Check the existence of an email in the System' })
	@ApiOkResponse({
		description: 'Exists?',
		type: Boolean,
		isArray: false
	})
	@ApiQuery({
		example: 'mock@gmail.com',
		name: 'email'
	})
	public async findByEmail(@Query('email') email: string): Promise<boolean> {
		const user: User = await new FindUserByEmail(this.repository).run(email);
		return Boolean(user);
	}
}
