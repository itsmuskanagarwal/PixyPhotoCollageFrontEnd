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

  selectedImages : any[] =[];
  count = 0;

  constructor(private httpClient: HttpClient) { }

  REST_API = 'http://localhost:3000';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  //Get all the uploaded images
getUploadedImages(userId : string): Observable<any> {
  const headers = new HttpHeaders();
  const params = new HttpParams().set('userId', userId);
  return this.httpClient
    .get(`${this.REST_API}/uploaded-images`, { headers, params, responseType: 'json' })
    .pipe(
      catchError((error) => {
        console.error('Error getting uploaded images', error);
        return throwError(() => new Error('Error getting uploaded images'));
      })
    );
}

 //Get all the uploaded images
 getProjects(): Observable<any> {
  return this.httpClient
    .get(`${this.REST_API}/get-projects`)
    .pipe(
      catchError((error) => {
        console.error('Error getting project images', error);
        return throwError(() => new Error('Error getting project images'));
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
uploadImages(userId: string, data: any): Observable<any> {
  const headers = new HttpHeaders();

  return this.httpClient
    .post(`${this.REST_API}/upload-images/${userId}`, data,  { headers, responseType: 'json' })
    .pipe(
      catchError((error) => {
        console.error('Error uploading images', error);
        return throwError(() => new Error('Error uploading images '));
      })
    );
}

//delete uploaded images
deleteUploadedImages(filename : string): Observable<any> {
  console.log(typeof filename)
  return this.httpClient
    .post(`${this.REST_API}/delete-uploaded-images`, { filename }, { responseType: 'text' })
    .pipe(
      catchError((error) => {
        console.error('Error deleting images', error);
        return throwError(() => new Error('Error deleting images'));
      })
    );
}


}
