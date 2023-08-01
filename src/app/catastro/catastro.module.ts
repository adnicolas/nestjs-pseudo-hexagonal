import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CadastralRefGetController } from './infrastructure/CadastralRefGetController';

@Module({
	imports: [HttpModule],
	controllers: [CadastralRefGetController],
	providers: [],
	exports: []
})
export class CatastroModule {}
