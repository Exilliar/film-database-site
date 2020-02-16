import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import * as firebase from 'firebase/app';

import { SignedInService } from 'src/app/core/services/signed-in/signed-in.service';

@Injectable()
export class UserService {

  constructor(
   public db: AngularFirestore,
   public afAuth: AngularFireAuth,
   private signedInService: SignedInService,
 ){
 }

  getCurrentUser(): Promise<firebase.User> {
    const vm: this = this;
    return new Promise<firebase.User>((resolve, reject) => {
      firebase.auth().onAuthStateChanged(function(user){
        if (user) {
          vm.signedInService.setSignedIn(true);
          resolve(user);
        } else {
          vm.signedInService.setSignedIn(false);
          reject('No user logged in');
        }
      });
    });
  }
}