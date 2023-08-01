export class ExtractTokenFromRequest {
	constructor(private readonly request: any) {}

	public run(): string | undefined {
		const [type, token] = this.request.headers.authorization?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
}
