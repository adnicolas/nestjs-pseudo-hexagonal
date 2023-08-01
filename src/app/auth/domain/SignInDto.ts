import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';
import { passwordValidationOptions } from '../../app.constants';

export class SignInDto {
	@ApiProperty({ example: 'mock@gmail.com' })
	@IsEmail()
	public email: string;

	@ApiProperty()
	@IsStrongPassword(passwordValidationOptions)
	public password: string;
}
