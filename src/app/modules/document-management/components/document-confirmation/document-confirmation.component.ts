import {Component, Input, OnInit} from '@angular/core';
import { Location} from '@angular/common';

@Component({
  selector: 'app-document-confirmation',
  templateUrl: './document-confirmation.component.html',
  styleUrls: ['./document-confirmation.component.css']
})
export class DocumentConfirmationComponent implements OnInit {
  @Input() userID: string;
  @Input() objID: string;
  location: Location;
  constructor(
    location: Location
  ) {
    this.location = location;
  }

  ngOnInit() {
  }

  checkStatus() {
    console.log(window.location.origin + "/#/document-archive/document-list/" + this.objID + "/" + this.userID)
    this.location.go("document-archive/document-list/" + this.objID + "/" + this.userID);
    window.location.reload();
  }
}
