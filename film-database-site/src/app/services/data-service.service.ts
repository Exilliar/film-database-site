import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Data } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(
    private http: HttpClient,
  ) { }

  baseurl = "https://api.film-database.co.uk"
  // baseurl = "http://localhost:8081"

  getData(): Observable<Data[]> {
    return this.http.get<Data[]>(
      this.baseurl + '/api/getData'
    );
  }

  getUser(uid): Observable<Data[]> {
    const headerDict = {
      'user': uid,
      'Access-Control-Allow-Origin': origin,
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    }

    const url = this.baseurl + '/api/getUser'

    return this.http.get<Data[]>(url, requestOptions);
  }
}
