import { User } from './User';

export interface UserRepository {
	findAll(): Promise<User[]>;
	findById(id: string): Promise<User>;
	deleteById(id: string): Promise<User>;
}
