import {
	Body,
	Controller,
	NotFoundException,
	Post,
	UnauthorizedException
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { authApiTag, authController } from '../auth.constants';
import { User } from '../../users/domain/User';
import { PostgresUserRepository } from '../../users/infrastructure/PostgresUserRepository';
import { FindUserByEmail } from '../../users/application/FindUserByEmail';
import { SignInDto } from '../domain/SignInDto';

@Controller(authController)
export class SignInController {
	constructor(
		private readonly repository: PostgresUserRepository,
		private jwtService: JwtService
	) {}

	@Post('login')
	@ApiTags(authApiTag)
	@ApiOperation({ summary: 'Allows the user to log in' })
	@ApiBody({
		required: true,
		type: SignInDto,
		isArray: false
	})
	@ApiOkResponse({
		type: String,
		isArray: false,
		status: 200,
		description: 'Token'
	})
	public async signIn(@Body() signInDto: SignInDto): Promise<string> {
		const user: User | null = await new FindUserByEmail(this.repository).run(
			signInDto.email
		);
		if (!user) {
			throw new NotFoundException();
		} else {
			const match: boolean = await bcrypt.compare(
				signInDto.password,
				user.password
			);
			if (!match) {
				throw new UnauthorizedException();
			} else {
				const payload = { sub: user.id, email: user.email };
				return this.jwtService.signAsync(payload);
			}
		}
	}
}
