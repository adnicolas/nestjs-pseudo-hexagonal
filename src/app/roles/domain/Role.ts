import { IsEnum } from 'class-validator';
import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { RoleEnum } from './Role.enum';
import { User } from '../../users/domain/User';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Role {
	@ApiProperty()
	@IsEnum(RoleEnum)
	@PrimaryColumn()
		id: RoleEnum;

	@OneToMany(() => User, (user) => user.role, {
		eager: false,
		cascade: false
	})
		users: User[];
}
