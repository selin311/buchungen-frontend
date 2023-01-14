import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class Backend {

  constructor(private http: HttpClient) { }

  public test() {
    this.http.get('http://localhost:8080/api/buchung').subscribe(
      data => {
        console.log(data);
      }
    )
  }
}
