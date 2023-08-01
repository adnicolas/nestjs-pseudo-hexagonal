import {
	ClassSerializerInterceptor,
	Controller,
	Get,
	UseGuards,
	UseInterceptors
} from '@nestjs/common';
import { rolesApiTag, rolesController } from '../roles.constants';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger';
import { Role } from '../domain/Role';
import { FindAllRoles } from '../application/FindAllRoles';
import { PostgresRoleRepository } from './PostgresRoleRepository';
import { AuthGuard } from '../../auth/infrastructure/AuthGuard';
import { Roles } from './roles.decorator';
import { RoleEnum } from '../domain/Role.enum';

@ApiBearerAuth()
@Controller(rolesController)
export class RolesGetController {
	constructor(private readonly repository: PostgresRoleRepository) {}
	@Get()
	@UseInterceptors(ClassSerializerInterceptor)
	@UseGuards(AuthGuard)
	@Roles(RoleEnum.ADMIN)
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
