import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, of } from 'rxjs';
import {Buchung} from "../model/model";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  private backendUrl = 'http://localhost:8080/api/buchung';  // URL to web api

  public saveBuchung(data: any) {
    return this.http.post(this.backendUrl, data);
  }

  public updateBuchung(data: any) {
    return this.http.put(this.backendUrl + '/update', data);
  }

  public deleteBuchung(buchungId: string) {
    return this.http.delete(this.backendUrl + '/' + buchungId);
  }

  public getAllBuchungen(): Observable<Buchung[]> {
    return this.http.get<Buchung[]>(this.backendUrl);
  }

  public getAllUsernames(): Observable<String[]> {
    return this.http.get<String[]>(this.backendUrl + '/allUsernames');
  }

}
