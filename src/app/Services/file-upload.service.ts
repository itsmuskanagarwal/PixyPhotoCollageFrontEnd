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
export class FileUploadService {

  constructor(private httpClient: HttpClient) { }

  REST_API = 'http://localhost:3000';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  //Get all the uploaded images
getUploadedImages(data: any): Observable<any> {
  return this.httpClient
    .get(`${this.REST_API}/uploaded-images`, { params: { email: data.email }, responseType: 'json' })
    .pipe(
      catchError((error) => {
        console.error('Error getting uploaded images', error);
        return throwError(() => new Error('Error getting uploaded images'));
      })
    );
}

//Add final project
addFinalProject(data: any): Observable<any> {
  return this.httpClient
    .post(`${this.REST_API}/add-final-project`, data, { responseType: 'json' })
    .pipe(
      catchError((error) => {
        console.error('Error adding final project', error);
        return throwError(() => new Error('Error adding final project'));
      })
    );
}

//upload images in systemt
uploadImages(data: any): Observable<any> {
  const headers = new HttpHeaders();
  return this.httpClient
    .post(`${this.REST_API}/upload-images`, data,  { headers, responseType: 'json' })
    .pipe(
      catchError((error) => {
        console.error('Error adding final project', error);
        return throwError(() => new Error('Error adding final project'));
      })
    );
}

//add images in DB
addImages(email: string, data:any): Observable<any> {
  const headers = new HttpHeaders();
  const body = {email, data}
  return this.httpClient
    .post(`${this.REST_API}/add-images`, body,  { headers, responseType: 'json' })
    .pipe(
      catchError((error) => {
        console.error('Error adding final project', error);
        return throwError(() => new Error('Error adding final project'));
      })
    );
}

}
