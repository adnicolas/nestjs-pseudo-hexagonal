import {
	ClassSerializerInterceptor,
	Controller,
	Get,
	UseInterceptors
} from '@nestjs/common';
import { rolesApiTag, rolesController } from '../roles.constants';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '../domain/Role';
import { FindAllRoles } from '../application/FindAllRoles';
import { PostgresRoleRepository } from './PostgresRoleRepository';

@Controller(rolesController)
export class RolesGetController {
	constructor(private readonly repository: PostgresRoleRepository) {}
	@Get()
	@UseInterceptors(ClassSerializerInterceptor)
	@ApiTags(rolesApiTag)
	@ApiOperation({ summary: 'Returns all the roles' })
	@ApiResponse({
		description: 'Role records',
		type: Role,
		isArray: true
	})
	public async findAll(): Promise<Role[]> {
		const roles: Role[] = await new FindAllRoles(this.repository).run();
		return roles;
	}
}
