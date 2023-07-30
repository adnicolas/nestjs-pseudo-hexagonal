import { IsStrongPasswordOptions } from 'class-validator';

export const passwordValidationOptions: IsStrongPasswordOptions = {
	minLength: 8,
	minNumbers: 2,
	minSymbols: 1,
	minUppercase: 1,
	minLowercase: 1
};

export const usersController = 'users';
export const usersApiTag = 'Users';
