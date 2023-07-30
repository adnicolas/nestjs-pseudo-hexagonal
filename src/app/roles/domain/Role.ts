import { IsEnum } from 'class-validator';
import { Identity } from '../../shared/domain/Identity';
import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { RoleEnum } from './Role.enum';
import { User } from '../../users/domain/User';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Role extends Identity {
	constructor() {
		super();
	}

	@ApiProperty()
	@IsEnum(RoleEnum)
	@PrimaryColumn()
		name: RoleEnum;

	@OneToMany(() => User, (user) => user.role, {
		eager: false,
		cascade: false
	})
		users: User[];
}
