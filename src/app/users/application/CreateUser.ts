import { RoleRepository } from 'src/app/roles/domain/RoleRepository';
import { IUser } from '../domain/IUser';
import { User } from '../domain/User';
import { UserPostDto } from '../domain/UserPostDto';
import { UserRepository } from '../domain/UserRepository';
import { Role } from '../../roles/domain/Role';
import { FindRoleById } from '../../roles/application/FindRoleByName';

export class CreateUser {
	constructor(
		private readonly repository: UserRepository,
		private roleRepository: RoleRepository
	) {}

	public async run(dto: UserPostDto): Promise<User> {
		const role: Role = await new FindRoleById(this.roleRepository).run(
			dto.roleId
		);
		const props: IUser = {
			...dto,
			role
		};
		return this.repository.create(props);
	}
}
