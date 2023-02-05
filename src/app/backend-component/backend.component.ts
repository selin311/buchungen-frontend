import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BackendService} from "../backend-service";

@Component({
  selector: 'app-backend',
  templateUrl: './backend.component.html',
  styleUrls: ['./backend.component.css']
})
export class BackendComponent implements OnInit {

  constructor(private backendService: BackendService) {
  }

  public ngOnInit() {
  }

  public test() {
    this.backendService.test();
    console.log('yes');
  }

}
