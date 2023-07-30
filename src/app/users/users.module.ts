import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/User';
import { METADATA_CONNECTION } from '../app.constants';
import { UsersGetController } from './infrastructure/UsersGetController';
import { PostgresUserRepository } from './infrastructure/PostgresUserRepository';
import { UserDeleteController } from './infrastructure/UserDeleteController';
import { UserGetController } from './infrastructure/UserGetController';
import { EmailExistenceGetController } from './infrastructure/EmailExistenceGetController';
import { UserPostController } from './infrastructure/UserPostController';
import { RolesModule } from '../roles/roles.module';

@Module({
	imports: [RolesModule, TypeOrmModule.forFeature([User], METADATA_CONNECTION)],
	controllers: [
		EmailExistenceGetController,
		UsersGetController,
		UserGetController,
		UserDeleteController,
		UserPostController
	],
	providers: [PostgresUserRepository],
	exports: []
})
export class UsersModule {}
