import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFireDatabase,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private fireAuth: AngularFireAuth,
    private fireDb: AngularFireDatabase,
    private router: Router,
    private toatr: ToastrService
  ) {}

  //method for registeration
  register(user: User) {
    this.fireAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        console.log(result);
        this.toatr.success('saving user data..', 'Registered Success !!');
        //save user data
        user.uid = result.user?.uid || '';
        user.displayName = result.user?.displayName || user.name.toUpperCase();
        user.emailVarfied = result.user?.emailVerified || false;
        user.password = '';
        user.imageURL =
          result.user?.photoURL ||
          'https://img.icons8.com/?size=512&id=tZuAOUGm9AuS&format=png';

        console.log(user);

        this.saveUserData(user)
          .then((data) => {
            console.log(data);
            this.toatr.success('user data saved !!');
            this.setUserToLocalStorage(user);
          })
          .catch((error) => {
            console.log(error);
            this.toatr.error('Error in saving data');
          });
      })
      .catch((error) => {
        console.log(error);
        this.toatr.error('Error in signup !!');
      });
  }

  // user detail ko save kar rha hai real time database mein
  saveUserData(user: User) {
    const userObjectRef: AngularFireObject<User> = this.fireDb.object(
      `users/${user.uid}`
    );
    return userObjectRef.set(user);
  }

  // save user to localstorage

  setUserToLocalStorage(user: User | null) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // return the status of login and if  user is logged in then return user
  get loggedInStatus() {
    const userString = localStorage.getItem('user');
    if (userString == null) {
      return false;
    } else {
      return JSON.parse(userString);
    }
  }

  // remvove the user from local storage
  logoutFromLocalStorage() {
    localStorage.removeItem('user');
  }

  // logout user ko firebase and also remove the user from localstorage
  signOut() {
    this.fireAuth
      .signOut()
      .then(() => {
        this.logoutFromLocalStorage();
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.log(error);

        this.toatr.error('Error in logging out!!');
      });
  }

  // login user
  login(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  getUserByUserId(uid: string | undefined): Observable<User | null> {
    const objectRef: AngularFireObject<User> = this.fireDb.object(
      `users/${uid}`
    );
    return objectRef.valueChanges();
  }
}
