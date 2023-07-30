import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';

export class FindAllUsers {
	constructor(private readonly repository: UserRepository) {}
	public async run(): Promise<User[]> {
		return this.repository.findAll();
	}
}
