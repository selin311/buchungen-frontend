import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Backend} from "./backend";
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  private backendUrl = 'http://localhost:8080/api/buchung';  // URL to web api

  public test() {
    this.http.get('http://localhost:8080/api/buchung').subscribe(
      data => {
        console.log(data);
      }
    )
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /* GET buchungen whose name contains search term */
  searchBackend(term: string): Observable<Backend[]> {
    if (!term.trim()) {
      // if not search term, return empty backend array.
      return of([]);
    }
    return this.http.get<Backend[]>(`${this.backendUrl}/?name=${term}`).pipe(
      catchError(this.handleError<Backend[]>('searchBackend', []))
    );
  }
}
