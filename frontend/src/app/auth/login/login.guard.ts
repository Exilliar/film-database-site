import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router
  ) {}

  canActivate(): boolean {
    const user: boolean = localStorage.getItem('signedIn') === 'true';

    if (user) {
      this.router.navigate(['/blurays']);
      return false;
    } else return true;
  }
}
