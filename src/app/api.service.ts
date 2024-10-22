import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestResponse } from './request';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/countries`);
  }

  getExchangeRate(currency: string, amount: number = 1): Observable<any> {
    const params = new HttpParams()
      .set('currency', currency)
      .set('amount', amount.toString());
    return this.http.get(`${this.baseUrl}/exchange-rate`, { params });
  }

  getWeather(city: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/weather/${city}`);
  }

  addRequest(data: {
    pais: string;
    ciudad: string;
    cantidad: number;
    rate: number;
    convert_cantidad: number;
    clima: string;
    temperatura: number;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/requests`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  getRequests(): Observable<RequestResponse> {
    // Establece el tipo de retorno
    return this.http.get<RequestResponse>(`${this.baseUrl}/requests`);
  }
}
