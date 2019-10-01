import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import * as firebase from 'firebase/app';

import { LoginValue } from 'src/app/models/login-value.model';

import { SignedInService } from 'src/app/services/signed-in/signed-in.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    private signedInService: SignedInService
  ) { }

  GoogleLogin(): Promise<firebase.auth.UserCredential> {
    const vm: this = this;
    return new Promise<firebase.auth.UserCredential>((resolve, reject) => {
      let provider: firebase.auth.GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        vm.signedInService.setSignedIn(true);
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }

  Login(value: LoginValue): Promise<firebase.auth.UserCredential> {
    const vm: this = this;
    return new Promise<firebase.auth.UserCredential>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        vm.signedInService.setSignedIn(true);
        resolve(res);
      }, err => reject(err))
    });
  }

  Register(value: LoginValue): Promise<firebase.auth.UserCredential> {
    const vm: this = this;
    return new Promise<firebase.auth.UserCredential>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        vm.signedInService.setSignedIn(true);
        resolve(res);
      }, err => reject(err))
    });
  }

  SignOut(): Promise<void> {
    const vm: this = this;
    return new Promise<void>((resolve, reject) => {
      firebase.auth().signOut()
      .then(res => {
        vm.signedInService.setSignedIn(false);
        resolve(res);
      }, err => reject(err));
    });
  }
}
