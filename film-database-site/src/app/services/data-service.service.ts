import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(
    private http: HttpClient
  ) { }

  getData() {
    console.log("calling api");

    return this.http.get(
      'http://localhost:8000/api/getData'
    );
  }
}
