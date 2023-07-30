import { Role } from '../domain/Role';
import { RoleRepository } from '../domain/RoleRepository';

export class FindAllRoles {
	constructor(private readonly repository: RoleRepository) {}
	public async run(): Promise<Role[]> {
		return this.repository.findAll();
	}
}
