import { RoleRepository } from 'src/app/roles/domain/RoleRepository';
import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';
import { Role } from '../../roles/domain/Role';
import { FindRoleById } from '../../roles/application/FindRoleByName';
import { UserPatchDto } from '../domain/UserPatchDto';

export class UpdateUser {
	constructor(
		private readonly repository: UserRepository,
		private readonly roleRepository: RoleRepository
	) {}

	public async run(dto: UserPatchDto, user: User): Promise<User> {
		for (const prop in dto) {
			if (prop === 'roleId') {
				const role: Role = await new FindRoleById(this.roleRepository).run(
					dto.roleId
				);
				user.role = role;
			} else {
				user[prop] = dto[prop];
			}
		}
		return this.repository.update(user);
	}
}
