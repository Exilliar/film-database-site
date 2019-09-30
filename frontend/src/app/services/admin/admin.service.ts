import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private admin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isAdmin: Observable<boolean> = this.admin.asObservable();

  setAdmin(isAdmin: boolean): void {
    this.admin.next(isAdmin);
  }
}
