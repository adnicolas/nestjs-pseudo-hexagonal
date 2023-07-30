import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';

export class FindUserByEmail {
	constructor(private readonly userRepository: UserRepository) {}

	public async run(email: string): Promise<User | null> {
		return this.userRepository.findByEmail(email);
	}
}
