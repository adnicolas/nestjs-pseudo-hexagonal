import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../domain/UserRepository';
import { User } from '../domain/User';
import { METADATA_CONNECTION } from '../../../app/app.constants';
import { Repository } from 'typeorm';
import { IUser } from '../domain/IUser';

export class PostgresUserRepository implements UserRepository {
	constructor(
		@InjectRepository(User, METADATA_CONNECTION)
		private readonly repository: Repository<User>
	) {}

	public async findAll(): Promise<User[]> {
		return this.repository.find();
	}

	public async findById(id: string): Promise<User | null> {
		const user: User = await this.repository.findOneBy({
			uuid: id
		});
		if (!user) {
			return null;
		}
		return user;
	}

	public async findByEmail(email: string): Promise<User | null> {
		const user: User = await this.repository.findOneBy({
			email: email
		});
		if (!user) {
			return null;
		}
		return user;
	}

	public async create(props: IUser): Promise<User> {
		return this.repository.save(props);
	}

	public async update(user: User): Promise<User> {
		return this.repository.save(user);
	}

	public async delete(user: User): Promise<User> {
		return this.repository.remove(user);
	}
}
