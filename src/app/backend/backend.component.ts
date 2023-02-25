import {Component, OnInit} from '@angular/core';
import {Backend} from "../backend";

@Component({
  selector: 'app-backend',
  templateUrl: './backend.component.html',
  styleUrls: ['./backend.component.css']
})
export class BackendComponent implements OnInit {

  constructor(private backendService: Backend) {
  }

  public ngOnInit() {
  }

  public test() {
    this.backendService.test();
    console.log('yes');
  }

}
