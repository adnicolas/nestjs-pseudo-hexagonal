import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from '../domain/RoleRepository';
import { Role } from '../domain/Role';
import { METADATA_CONNECTION } from '../../../app/app.constants';
import { Repository } from 'typeorm';
import { RoleEnum } from '../domain/Role.enum';

export class PostgresRoleRepository implements RoleRepository {
	constructor(
		@InjectRepository(Role, METADATA_CONNECTION)
		private readonly repository: Repository<Role>
	) {}

	public async findAll(): Promise<Role[]> {
		return this.repository.find();
	}

	public async findById(id: RoleEnum): Promise<Role | null> {
		const role: Role = await this.repository.findOneBy({
			id: id
		});
		if (!role) {
			return null;
		}
		return role;
	}
}
