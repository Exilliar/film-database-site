import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './user.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserService,
    private router: Router
  ) {}

  canActivate(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(user => {
        console.log("yup");
        return resolve(true);
      }, err => {
<<<<<<< HEAD
        this.router.navigate(['/']);
        console.log("nope");
=======
        this.router.navigate(['/login']);
>>>>>>> ed21944eba189dfbac2dc18a003ef0a533025488
        return resolve(false);
      })
    })
  }
}
