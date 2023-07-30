import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import { Identity } from '../../shared/domain/Identity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Role } from '../../roles/domain/Role';
import { Exclude } from 'class-transformer';
import { passwordValidationOptions } from '../users.constants';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User extends Identity {
	constructor() {
		super();
	}

	@ApiProperty()
	@IsString()
	@Column({
		nullable: false,
		update: true
	})
		name: string;

	@ApiProperty()
	@IsString()
	@Column({
		nullable: false,
		update: true
	})
		surname: string;

	@ApiProperty()
	@IsEmail()
	@Column({
		nullable: false,
		update: true
	})
		email: string;

	@Exclude({
		toPlainOnly: true
	})
	@IsStrongPassword(passwordValidationOptions)
	@Column({
		type: 'varchar',
		nullable: false,
		update: true
	})
		password: string;

	@ApiProperty()
	@ManyToOne(() => Role, (role) => role.users, {
		eager: true,
		cascade: false
	})
		role: Role;
}
