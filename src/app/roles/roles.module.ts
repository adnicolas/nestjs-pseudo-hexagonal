import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './domain/Role';
import { METADATA_CONNECTION } from '../app.constants';

@Module({
	imports: [TypeOrmModule.forFeature([Role], METADATA_CONNECTION)],
	controllers: [],
	providers: [],
	exports: []
})
export class RolesModule {}
