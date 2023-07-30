import { User } from './User';

export interface UserRepository {
	findAll(): Promise<User[]>;
	findById(id: string): Promise<User>;
	delete(user: User): Promise<User>;
}
