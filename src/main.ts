import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { isLocal } from './app/utils/env.utils';

const defaultPort = 3000;

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors: isLocal
	});
	app.useGlobalPipes(
		new ValidationPipe({
			disableErrorMessages: !isLocal
		})
	);
	const config = getSwaggerConfig();
	const document = SwaggerModule.createDocument(app, config);
	const globalPrefix = 'api';
	SwaggerModule.setup(globalPrefix, app, document);
	await app.listen(defaultPort);
}

const getSwaggerConfig = () =>
	new DocumentBuilder()
		.setTitle('NestJS pseudo hexagonal API swagger')
		.setDescription('The NestJS pseudo hexagonal API description')
		.setVersion('1.0')
		.addBearerAuth()
		.build();

bootstrap();
