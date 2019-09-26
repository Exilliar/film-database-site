import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../user/user.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserService,
    private router: Router
  ) {}

  canActivate(): boolean{
    const user: boolean = localStorage.getItem('signedIn') === 'true';

    if (user) return true;
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
