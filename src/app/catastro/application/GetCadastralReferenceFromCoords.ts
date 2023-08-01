import { catchError, firstValueFrom } from 'rxjs';
import { rccoorUrl } from '../catastro.constants';
import { RCCOOR } from '../domain/RCCOOR';
import { NotFoundException } from '@nestjs/common';
import { HttpService } from '../domain/HttpService';

export class GetCadastralReferenceFromCoords {
	constructor(private readonly httpService: HttpService) {}

	public async run(x: string, y: string, epsg: string): Promise<string> {
		const { data } = await firstValueFrom(
			this.httpService
				.get<RCCOOR>(`${rccoorUrl}?CoorX=${x}&CoorY=${y}&SRS=${epsg}`)
				.pipe(
					catchError((error) => {
						throw new Error();
					})
				)
		);
		return this.getCadastralReference(data);
	}

	private async getCadastralReference(response: RCCOOR): Promise<string> {
		const pc = response.Consulta_RCCOORResult.coordenadas?.coord[0].pc;
		if (pc) {
			return `${pc.pc1}${pc.pc2}`;
		}
		throw new NotFoundException(
			'No se ha encontrado ninguna parcela catastral'
		);
	}
}
