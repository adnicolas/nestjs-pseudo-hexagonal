/* eslint-disable indent */
import { Controller, Delete, NotFoundException, Param } from '@nestjs/common';
import { usersApiTag, userController } from '../users.constants';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostgresUserRepository } from './PostgresUserRepository';
import { DeleteUser } from '../application/DeleteUser';
import { FindUserById } from '../application/FindUserById';
import { User } from '../domain/User';

@Controller(userController)
export class UserDeleteController {
	constructor(private readonly repository: PostgresUserRepository) {}
	@Delete(':id')
	@ApiTags(usersApiTag)
	@ApiOperation({ summary: 'Delete a user' })
	public async delete(@Param('id') id: string): Promise<void> {
		const user: User = await new FindUserById(this.repository).run(id);
		if (!user) {
			throw new NotFoundException();
		}
		await new DeleteUser(this.repository).run(user);
	}
}
