import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';

export class DeleteUser {
	constructor(private readonly repository: UserRepository) {}

	public async run(user: User): Promise<User> {
		return this.repository.delete(user);
	}
}
