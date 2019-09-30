import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../userService/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private userService: UserService,
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
