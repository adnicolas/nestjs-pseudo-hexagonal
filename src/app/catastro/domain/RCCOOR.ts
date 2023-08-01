interface COORD {
	pc: {
		pc1: string; // Posiciones 1-7 de la ref. catastral
		pc2: string; // Posiciones 8-14 de la ref. catastral
	};
	geo: {
		xcen: string; // Coordenada X solicitada
		ycen: string; // Coordenada Y solicitada
		srs: string; // Sistema de referencia
	};
	ldt: string; // Dirección (calle, nº, municipio o polígono, parcela y municipio) de la parcela
}

export interface RCCOOR {
	Consulta_RCCOORResult: {
		control: {
			cucoor: number; // Nº de items en la lista de coordenadas
			cuerr?: number; // Nº de items en la lista de errores
		};
		coordenadas: {
			coord: COORD[]; // Lista de coordenadas
		};
	};
}
