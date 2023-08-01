import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from '../../roles/domain/Role.enum';
import { PostgresUserRepository } from '../../users/infrastructure/PostgresUserRepository';
import { User } from '../../users/domain/User';
import { FindUserByEmail } from '../../users/application/FindUserByEmail';
import { ExtractTokenFromRequest } from '../application/ExtractTokenFromRequest';
import { ROLES_KEY } from '../../roles/infrastructure/roles.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly jwtService: JwtService,
		private readonly userRepository: PostgresUserRepository,
		private reflector: Reflector
	) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
			ROLES_KEY,
			[context.getHandler(), context.getClass()]
		);
		const request = context.switchToHttp().getRequest();
		const token: string = new ExtractTokenFromRequest(request).run();
		if (!token) {
			throw new UnauthorizedException();
		}
		try {
			const payload = await this.jwtService.verifyAsync(token, {
				secret: process.env.JWT_SECRET
			});
			request['user'] = payload;
			const user: User = await new FindUserByEmail(this.userRepository).run(
				payload.email
			);
			if (!requiredRoles) {
				return true;
			}
			return requiredRoles.some((role: RoleEnum) => user.role.id === role);
		} catch {
			throw new UnauthorizedException();
		}
	}
}
