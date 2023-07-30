import { Role } from './Role';
import { RoleEnum } from './Role.enum';

export interface RoleRepository {
	findAll(): Promise<Role[]>;
	findById(id: RoleEnum): Promise<Role>;
}
