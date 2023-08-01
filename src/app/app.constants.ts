import { IsStrongPasswordOptions } from 'class-validator';

export const METADATA_CONNECTION = 'metadataConnection';
export const GEODATA_CONNECTION = 'geodataConnection';

export const passwordValidationOptions: IsStrongPasswordOptions = {
	minLength: 8,
	minNumbers: 2,
	minSymbols: 1,
	minUppercase: 1,
	minLowercase: 1
};
