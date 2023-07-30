import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './domain/Role';
import { METADATA_CONNECTION } from '../app.constants';
import { RolesGetController } from './infrastructure/RolesGetController';
import { PostgresRoleRepository } from './infrastructure/PostgresRoleRepository';

@Module({
	imports: [TypeOrmModule.forFeature([Role], METADATA_CONNECTION)],
	controllers: [RolesGetController],
	providers: [PostgresRoleRepository],
	exports: []
})
export class RolesModule {}
