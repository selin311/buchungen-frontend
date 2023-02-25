import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { BackendService } from '../backend-service/backend-service';

@Component({
  selector: 'app-buchungen-suche',
  templateUrl: './buchungen-suche.component.html',
  styleUrls: ['./buchungen-suche.component.css']
})
export class BuchungenSucheComponent {
/*  backend$!: Observable<Backend[]>;
  private searchTerm = new Subject<string>();

  constructor(private backendService: BackendService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerm.next(term);
  }

  ngOnInit(): void {
    this.backend$ = this.searchTerm.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.backendService.searchBackend(term)),
    );
  }*/


}


