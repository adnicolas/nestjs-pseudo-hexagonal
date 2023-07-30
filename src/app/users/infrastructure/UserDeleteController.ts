import { Controller, Delete, Param } from '@nestjs/common';
import { usersApiTag, usersController } from '../users.constants';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostgresUserRepository } from './PostgresUserRepository';
import { DeleteUserById } from '../application/DeleteUserById';

@Controller(usersController)
export class UserDeleteController {
	constructor(private readonly repository: PostgresUserRepository) {}
	@Delete(':id')
	@ApiTags(usersApiTag)
	@ApiOperation({ summary: 'Delete a user' })
	public async delete(@Param('id') id: string): Promise<void> {
		await new DeleteUserById(this.repository).run(id);
	}
}
