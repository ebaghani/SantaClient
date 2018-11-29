import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Login } from '../models/login';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import {LoginResult} from '../models/login-result'



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private endpoint = "https://baghaniassign2v4.azurewebsites.net";
  //private URL = "https://baghaniassign2v4.azurewebsites.net/api/children";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  
  constructor(public _http: Http, public _httpClient: HttpClient) { }
  
  authenticateLogin (login): Observable<LoginResult> {
    //console.log(child);
    return this._httpClient.post(this.endpoint + '/login', JSON.stringify(login), this.httpOptions).pipe(
      tap((login) => console.log(`Successfully logged in with credentials=${login}`)),
      catchError(this.handleError)
    );
  }
  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}



