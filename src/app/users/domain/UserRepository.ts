import { IUser } from './IUser';
import { User } from './User';

export interface UserRepository {
	findAll(): Promise<User[]>;
	findById(id: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	delete(user: User): Promise<User>;
	create(props: IUser): Promise<User>;
}
