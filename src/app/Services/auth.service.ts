import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { Observable, throwError, tap } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  REST_API = 'http://localhost:3000';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

//Register user
register(data: any): Observable<any> {
  return this.httpClient
    .post(`${this.REST_API}/add-user`, data, { responseType: 'json' })
    .pipe(
      catchError((error) => {
        console.error('Error adding user', error);
        return throwError(() => new Error('Error adding user'));
      })
    );
}

//Authentication
authenticateUser(email: string, password: string): Observable<any> {
  const body = { email, password };
  console.log(body)
  return this.httpClient
    .post(`${this.REST_API}/login`, body)
    .pipe(
      catchError((error) => {
        console.error('Error authenticating user', error);
        return throwError(() => new Error('Error authenticating user'));
      })
    );
}

//updateUser
updateUser(data: any): Observable<any> {
  return this.httpClient
    .put(`${this.REST_API}/update-user`, data, { responseType: 'json' })
    .pipe(
      catchError((error) => {
        console.error('Error updating user', error);
        return throwError(() => new Error('Error updating user'));
      })
    );
}

 // Get all users
 getUsers(): Observable<any> {
  return this.httpClient.get(this.REST_API + '/find-users').pipe(
    catchError((error) => {
      // Handle the error
      console.error('Error fetching user', error);
      return throwError(() => new Error('Error fetching user'));
    })
  );
}


//Contact query
addQuery(data: any): Observable<any> {
  return this.httpClient
    .post(`${this.REST_API}/add-query`, data, { responseType: 'json' })
    .pipe(
      catchError((error) => {
        console.error('Error adding query', error);
        return throwError(() => new Error('Error adding query'));
      })
    );
}


//Profile picture
findUserAvatar(data: any): Observable<any> {
  return this.httpClient
    .get(`${this.REST_API}/find-user-avatar`, { params: { email: data.email }, responseType: 'json' })
    .pipe(
      catchError((error) => {
        console.error('Error finding user avatar', error);
        return throwError(() => new Error('Error finding user avatar'));
      })
    );
}

//Update profile picture
updateAvatar(data: any): Observable<any> {
  return this.httpClient
    .put(`${this.REST_API}/update-avatar`, data, { responseType: 'json' })
    .pipe(
      catchError((error) => {
        console.error('Error updating avatar', error);
        return throwError(() => new Error('Error updating avatar'));
      })
    );
}
}
