import { ApiProperty } from '@nestjs/swagger';
import {
	IsEmail,
	IsEnum,
	IsString,
	IsStrongPassword,
	IsUUID
} from 'class-validator';
import { passwordValidationOptions } from '../../app.constants';
import { RoleEnum } from 'src/app/roles/domain/Role.enum';

export class UserPostDto {
	@ApiProperty({
		required: true,
		type: String,
		nullable: false
	})
	@IsUUID()
		uuid: string;

	@ApiProperty({
		example: 'mock@gmail.com',
		type: String,
		required: true,
		nullable: false
	})
	@IsEmail()
		email: string;

	@ApiProperty({
		example: '2023Password!',
		type: String,
		required: true,
		nullable: false
	})
	@IsStrongPassword(passwordValidationOptions)
		password: string;

	@ApiProperty({
		type: String,
		example: 'Robert',
		required: true,
		isArray: false,
		nullable: false
	})
	@IsString()
		name: string;

	@ApiProperty({
		type: String,
		example: 'Patiño',
		required: true,
		isArray: false,
		nullable: false
	})
	@IsString()
		surname: string;

	@ApiProperty({
		type: String,
		required: true,
		example: RoleEnum.EDITOR,
		enum: RoleEnum,
		isArray: false,
		nullable: false
	})
	@IsEnum(RoleEnum)
		roleId: RoleEnum;
}
