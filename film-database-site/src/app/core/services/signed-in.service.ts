import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignedInService {
  localStor = localStorage.getItem('signedIn') === 'true'

  private _signedIn = new BehaviorSubject<boolean>(this.localStor !== undefined ? this.localStor : false);
  isSignedIn = this._signedIn.asObservable();

  setSignedIn(isSignedIn: boolean): void {
    this._signedIn.next(isSignedIn);
    localStorage.setItem('signedIn',String(isSignedIn));
  }
}
