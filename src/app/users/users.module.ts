import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/User';
import { METADATA_CONNECTION } from '../app.constants';
import { UsersGetController } from './infrastructure/UsersGetController';
import { PostgresUserRepository } from './infrastructure/PostgresUserRepository';
import { UserDeleteController } from './infrastructure/UserDeleteController';

@Module({
	imports: [TypeOrmModule.forFeature([User], METADATA_CONNECTION)],
	controllers: [UsersGetController, UserDeleteController],
	providers: [PostgresUserRepository],
	exports: []
})
export class UsersModule {}
