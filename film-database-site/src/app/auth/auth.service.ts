import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

import { SignedInService } from './../core/services/signed-in.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    private signedInService: SignedInService
  ) { }

  GoogleLogin(){
    const vm = this;
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        console.log("google login");
        vm.signedInService.setSignedIn(true);
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }

  Login(value){
    const vm = this;
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        console.log("login");
        vm.signedInService.setSignedIn(true);
        resolve(res);
      }, err => reject(err))
    })
  }

  Register(value){
    const vm = this;
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        console.log("Register");
        vm.signedInService.setSignedIn(true);
        resolve(res);
      }, err => reject(err))
    })
  }

  SignOut(){
    const vm = this;
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signOut()
      .then(res => {
        vm.signedInService.setSignedIn(false);
        resolve(res);
      }, err => reject(err));
    })
  }
}
