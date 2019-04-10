import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Data } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(
    private http: HttpClient
  ) { }

  getData(): Observable<Data[]> {
    console.log("calling api");

    return this.http.get<Data[]>(
      'https://api.film-database.co.uk/api/getData'
    );
  }
}
