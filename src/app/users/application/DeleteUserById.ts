import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';

export class DeleteUserById {
	constructor(private readonly repository: UserRepository) {}

	public async run(id: string): Promise<User> {
		return this.repository.deleteById(id);
	}
}
