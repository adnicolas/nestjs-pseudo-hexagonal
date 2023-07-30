import { Role } from '../domain/Role';
import { RoleEnum } from '../domain/Role.enum';
import { RoleRepository } from '../domain/RoleRepository';

export class FindRoleById {
	constructor(private readonly repository: RoleRepository) {}
	public async run(id: RoleEnum): Promise<Role> {
		return this.repository.findById(id);
	}
}
