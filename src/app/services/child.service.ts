import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Child } from '../models/child';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ChildService {
  private endpoint = "https://baghaniassign2v3.azurewebsites.net";
  private URL = "https://baghaniassign2v3.azurewebsites.net/api/children";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  

  constructor(public _http: Http, public _httpClient: HttpClient) { }

  getChildsPromise(): Promise<Child[]> {
    return this._http.get(this.URL)
      .toPromise().then(data => data.json() as Child[])
      .catch(this.handleError);
  }

  getChildsObservable() : Observable<Child[]> {
    return this._http.get(this.URL)
    .pipe(
      map(
        (response: Response) => response.json()
      )
    );
  }

  getChild(id): Observable<Child> {
    return this._http.get(this.endpoint + '/api/children/' + id).pipe(
      map(
        (response: Response) => response.json()
      )
    );
  }
  
  addChild (child): Observable<Child> {
    //console.log(child);
    return this._httpClient.post(this.endpoint + '/register', JSON.stringify(child), this.httpOptions).pipe(
      tap((child) => console.log(`Added Child w/ id=${child}`)),
      catchError(this.handleError)
    );
  }
  
  updateChild (id, child): Observable<Child> {
    //console.log(`Trying to Update Child id=${id}` + child.firstName);
    return this._httpClient.put(this.endpoint + '/api/children/' + id, child, this.httpOptions).pipe(
      tap(_ => console.log(`Updated Child id=${id}`)),
      catchError(this.handleError)
    );
    //console.log(`After Trying to Update Child id=${id}` + child.firstName);
  }
  
  deleteChild(id): Observable<Child> {
    //console.log(`Trying to Delete Child id=${id}`);
     return this._httpClient.delete(this.endpoint + '/api/children/' + id, this.httpOptions).pipe(
      //console.log(`Trying to Delete Child id=${id}`);
      tap(_ => console.log(`Deleted Child id=${id}`)),
      catchError(this.handleError)
    );
    
  }
  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}


