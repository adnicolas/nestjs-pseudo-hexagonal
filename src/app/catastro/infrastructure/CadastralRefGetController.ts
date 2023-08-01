import { HttpService as AxiosHttpService } from '@nestjs/axios';
import { Controller, Get, Query } from '@nestjs/common';
import {
	ApiOkResponse,
	ApiOperation,
	ApiQuery,
	ApiTags
} from '@nestjs/swagger';
import { CatastroEpsg } from '../domain/CatastroEpsg.enum';
import { catastroApiTag, catastroController } from '../catastro.constants';
import { GetCadastralReferenceFromCoords } from '../application/GetCadastralReferenceFromCoords';

@Controller(`${catastroController}/cadastralref`)
export class CadastralRefGetController {
	constructor(private readonly httpService: AxiosHttpService) {}
	@Get()
	@ApiTags(catastroApiTag)
	@ApiOperation({ summary: 'Get the cadastral reference from coordinates' })
	@ApiQuery({
		name: 'x',
		required: true,
		example: '-653738.43',
		type: String,
		isArray: false
	})
	@ApiQuery({
		name: 'y',
		required: true,
		example: '5368096.96',
		type: String,
		isArray: false
	})
	@ApiQuery({
		name: 'epsg',
		required: true,
		enum: CatastroEpsg,
		example: CatastroEpsg.EPSG3857,
		type: String,
		isArray: false
	})
	@ApiOkResponse({
		description: 'Cadastral reference',
		isArray: false
	})
	public async getCadastralReference(
		@Query('x') x: string,
		@Query('y') y: string,
		@Query('epsg') epsg: string
	): Promise<string> {
		const cadastralReference: string =
			await new GetCadastralReferenceFromCoords(this.httpService).run(
				x,
				y,
				epsg
			);
		return cadastralReference;
	}
}
