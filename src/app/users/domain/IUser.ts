import { Role } from '../../roles/domain/Role';
import { IIdentity } from '../../shared/domain/IIdentity';

export interface IUser extends IIdentity {
	email: string;
	name: string;
	surname: string;
	password: string;
	role: Role;
}
