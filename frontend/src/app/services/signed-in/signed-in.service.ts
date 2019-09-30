import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignedInService {
  localStor: boolean = localStorage.getItem('signedIn') === 'true'

  private _signedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.localStor !== undefined ? this.localStor : false);
  isSignedIn: Observable<boolean> = this._signedIn.asObservable();

  setSignedIn(isSignedIn: boolean): void {
    this._signedIn.next(isSignedIn);
    localStorage.setItem('signedIn',String(isSignedIn));
  }
}
