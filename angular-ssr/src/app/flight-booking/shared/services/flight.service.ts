import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from 'src/app/entities/flight';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  url = 'http://www.angular.at/api/flight';
  // url = 'https://demo.angulararchitects.io/api/Flight';

  constructor(private http: HttpClient) { }

  find(from: string, to: string): Observable<Flight[]> {
    const headers = new HttpHeaders().set('Accept', 'application/json')
    const params = new HttpParams().set('from', from).set('to', to)

    return this.http.get<Flight[]>(this.url, { headers, params })
  }
}
