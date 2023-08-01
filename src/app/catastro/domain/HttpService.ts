import { Observable } from 'rxjs';

export interface HttpService {
	get<T = any>(url: string): Observable<any>;
}
