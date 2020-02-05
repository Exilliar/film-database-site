import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Role } from 'src/app/models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(
    private http: HttpClient,
  ) { }

  baseurl: string = "https://api.film-database.co.uk";
  // baseurl: string = "http://localhost:8081";

  getAll(): Observable<Role[]> {
    return this.http.get<Role[]>(
      this.baseurl + '/roles/getAll'
    )
  }
}
