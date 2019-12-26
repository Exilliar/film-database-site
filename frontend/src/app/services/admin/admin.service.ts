import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private admin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isAdmin: Observable<boolean> = this.admin.asObservable();

  setAdmin(isAdmin: boolean): void {
    this.admin.next(isAdmin);
  }

  constructor(
    private http: HttpClient,
  ) {  }

  // MAYBE CONSIDER CREATING SEPARATE USER SERVICE FOR USER BASED APIS

  baseurl: string = "https://api.film-database.co.uk";
  // baseurl: string = "http://localhost:8081";

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseurl + '/api/getAllUsers');
  }
}
