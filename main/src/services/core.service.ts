import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, retry} from 'rxjs/operators';
import {Service} from '../models/service.interface';

@Injectable({
  providedIn: 'root'
})
export class CoreService implements Service {
  baseUrl = 'http://localhost:5200';

  constructor(private http: HttpClient) {
  }

  get<T>(endpoint: string, model: any, httpOptions = {}): Observable<T[]> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, httpOptions).pipe(
      retry(1),
      map((data) => this.formatResponse<T>(data, model))
    );
  }

  post(endpoint: string, body: any, model: any, httpOptions = {}): Observable<any> {
    return this.http.post(`${this.baseUrl}${endpoint}`, body, httpOptions).pipe(
      retry(1),
      map((data) => {
        console.log('post response', data)
        return data
      })
    );
  }

  put(endpoint: string, body: any, model: any, httpOptions = {}): Observable<any> {
    return this.http.put(`${this.baseUrl}${endpoint}`, body, httpOptions).pipe(
      retry(1),
      map((data) => {
        console.log('put response', data)
        return data
      })
    );
  }

  formatResponse<T>(data: any, model: any): T[] {
    if (!Array.isArray(data)) {
      data = [data];
    }

    return data.map(model.adapt);
  }
}
