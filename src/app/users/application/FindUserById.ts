import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';

export class FindUserById {
	constructor(private readonly repository: UserRepository) {}
	public async run(id: string): Promise<User> {
		return this.repository.findById(id);
	}
}
