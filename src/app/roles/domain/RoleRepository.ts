import { Role } from './Role';

export interface RoleRepository {
	findAll(): Promise<Role[]>;
}
