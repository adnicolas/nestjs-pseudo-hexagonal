import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../domain/UserRepository';
import { User } from '../domain/User';
import { METADATA_CONNECTION } from '../../../app/app.constants';
import { Repository } from 'typeorm';

export class PostgresUserRepository implements UserRepository {
	constructor(
		@InjectRepository(User, METADATA_CONNECTION)
		private readonly repository: Repository<User>
	) {}

	public async findAll(): Promise<User[]> {
		return this.repository.find();
	}

	public async findById(id: string): Promise<User> {
		return this.repository.findOneBy({
			uuid: id
		});
	}

	public async delete(user: User): Promise<User> {
		return this.repository.remove(user);
	}
}
