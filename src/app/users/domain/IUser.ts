import { Role } from '../../roles/domain/Role';

export interface IUser {
	uuid: string;
	email: string;
	name: string;
	surname: string;
	password: string;
	role: Role;
}
