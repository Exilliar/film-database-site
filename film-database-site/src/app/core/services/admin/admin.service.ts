import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private admin = new BehaviorSubject<boolean>(false);
  isAdmin = this.admin.asObservable();

  setAdmin(isAdmin: boolean): void {
    this.admin.next(isAdmin);
  }
}
