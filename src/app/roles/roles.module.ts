import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './domain/Role';
import { METADATA_CONNECTION } from '../app.constants';
import { RolesGetController } from './infrastructure/RolesGetController';
import { PostgresRoleRepository } from './infrastructure/PostgresRoleRepository';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

@Module({
	imports: [forwardRef(() => UsersModule), TypeOrmModule.forFeature([Role], METADATA_CONNECTION)],
	controllers: [RolesGetController],
	providers: [PostgresRoleRepository, JwtService],
	exports: [PostgresRoleRepository]
})
export class RolesModule {}
