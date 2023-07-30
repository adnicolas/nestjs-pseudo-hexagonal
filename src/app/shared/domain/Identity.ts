import { Exclude } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IIdentity } from './IIdentity';

@Entity()
export abstract class Identity {
	constructor(props: IIdentity) {
		/* TODO document why this constructor is empty */
	}

	// As this id is internal and autogenerated we exclude the field
	@Exclude()
	@PrimaryGeneratedColumn()
		id: number; // Internal identifier, automatically generated by the DB

	@IsUUID()
	@Column({
		type: 'uuid',
		nullable: false,
		update: false,
		unique: true
	})
		uuid: string; // External identifier, generated in the frontend
}
