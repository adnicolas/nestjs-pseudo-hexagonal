import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { METADATA_CONNECTION } from '../app.constants';
import { SignInController } from './infrastructure/SignInController';
import { UsersModule } from '../users/users.module';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { tokenExpirationInSeconds } from './auth.constants';

@Module({
	imports: [
		UsersModule,
		JwtModule.registerAsync({
			useFactory: async (configService: ConfigService) => ({
				global: true,
				secret: configService.get<string>('JWT_SECRET'),
				signOptions: { expiresIn: `${tokenExpirationInSeconds}s` }
			}),
			inject: [ConfigService]
		}),
		TypeOrmModule.forFeature([], METADATA_CONNECTION)
	],
	controllers: [SignInController],
	providers: [],
	exports: []
})
export class AuthModule {}
