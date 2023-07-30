import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envFilePath, isLocal } from './utils/env.utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GEODATA_CONNECTION, METADATA_CONNECTION } from './app.constants';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath,
			isGlobal: true
		}),
		TypeOrmModule.forRootAsync({
			// src: https://github.com/nestjs/typeorm/issues/86
			name: GEODATA_CONNECTION,
			useFactory: async (configService: ConfigService) => ({
				type: 'postgres',
				name: GEODATA_CONNECTION,
				host: configService.get('GEODATA_DB_HOST'),
				username: configService.get('DATABASE_USER'),
				password: configService.get('GEODATA_DB_PASSWORD'),
				database: configService.get('GEODATA_DB_NAME'),
				port: Number(configService.get('GEODATA_DB_PORT')),
				synchronize: isLocal,
				logging: isLocal,
				entities: []
			}),
			inject: [ConfigService]
		}),
		TypeOrmModule.forRootAsync({
			// src: https://github.com/nestjs/typeorm/issues/86
			name: METADATA_CONNECTION,
			useFactory: async (configService: ConfigService) => ({
				type: 'postgres',
				name: METADATA_CONNECTION,
				host: configService.get('METADATA_DB_HOST'),
				username: configService.get('DATABASE_USER'),
				password: configService.get('METADATA_DB_PASSWORD'),
				database: configService.get('METADATA_DB_NAME'),
				port: Number(configService.get('METADATA_DB_PORT')),
				synchronize: isLocal,
				logging: isLocal,
				entities: []
			}),
			inject: [ConfigService]
		})
	],
	controllers: [],
	providers: []
})
export class AppModule {}
