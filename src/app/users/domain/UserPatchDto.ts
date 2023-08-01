import { ApiProperty } from '@nestjs/swagger';
import {
	IsEmail,
	IsEnum,
	IsOptional,
	IsString,
	IsStrongPassword
} from 'class-validator';
import { passwordValidationOptions } from '../users.constants';
import { RoleEnum } from 'src/app/roles/domain/Role.enum';

export class UserPatchDto {
	@ApiProperty({
		example: 'mock@gmail.com',
		type: String,
		required: false,
		nullable: false
	})
	@IsOptional()
	@IsEmail()
		email: string;

	@ApiProperty({
		example: '2023Password!',
		type: String,
		required: false,
		nullable: false
	})
	@IsOptional()
	@IsStrongPassword(passwordValidationOptions)
		password: string;

	@ApiProperty({
		type: String,
		example: 'Adrián',
		required: false,
		isArray: false,
		nullable: false
	})
	@IsOptional()
	@IsString()
		name: string;

	@ApiProperty({
		type: String,
		example: 'Nicolás',
		required: false,
		isArray: false,
		nullable: false
	})
	@IsOptional()
	@IsString()
		surname: string;

	@ApiProperty({
		type: String,
		required: false,
		example: RoleEnum.EDITOR,
		enum: RoleEnum,
		isArray: false,
		nullable: false
	})
	@IsOptional()
	@IsEnum(RoleEnum)
		roleId: RoleEnum;
}
