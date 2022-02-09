import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import FirebaseAuthData from '../model/FirebaseAuthData.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseData: FirebaseAuthData;
  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    if (this.firebaseData) {
      return true;
    } else {
      return false;
    }
  }

  signup(email: string, password: string) {
    return this.http
      .post<FirebaseAuthData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          environment.firebase.apiKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((resData: FirebaseAuthData) => {
          this.firebaseData = resData;
          // console.log('this.firebaseData', this.firebaseData);
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<FirebaseAuthData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          environment.firebase.apiKey,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        tap((resData: FirebaseAuthData) => {
          this.firebaseData = resData;
          // console.log('this.firebaseData', this.firebaseData);
        })
      );
  }
}
