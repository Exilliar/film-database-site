import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RawUser } from 'src/app/core/models/raw-user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  adminSet = localStorage.getItem("admin");

  private admin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.adminSet === "true");
  isAdmin: Observable<boolean> = this.admin.asObservable();

  setAdmin(isAdmin: boolean): void {
    localStorage.setItem("admin", String(isAdmin));
    this.admin.next(isAdmin);
  }

  constructor(
    private http: HttpClient,
  ) {  }

  // MAYBE CONSIDER CREATING SEPARATE USER SERVICE FOR USER BASED APIS/DIFFERENT SERVICE FOR ACCESSING EACH TABLE

  baseurl: string = "https://api.film-database.co.uk";
  // baseurl: string = "http://localhost:8081";

  getUsers(): Observable<RawUser[]> {
    return this.http.get<RawUser[]>(this.baseurl + '/users/getAll');
  }

  updateUser(role: number, uid: string): Observable<string> {
    const data = {
      'role': role,
      'uid': uid,
      'Access-Control-Allow-Origin': origin,
    };

    const url: string = this.baseurl + '/roles/updateSingle';

    return this.http.post(url, data, {responseType: 'text'});
  }
}
