import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from '../domain/RoleRepository';
import { Role } from '../domain/Role';
import { METADATA_CONNECTION } from '../../../app/app.constants';
import { Repository } from 'typeorm';

export class PostgresRoleRepository implements RoleRepository {
	constructor(
		@InjectRepository(Role, METADATA_CONNECTION)
		private readonly repository: Repository<Role>
	) {}

	public async findAll(): Promise<Role[]> {
		return this.repository.find();
	}
}
