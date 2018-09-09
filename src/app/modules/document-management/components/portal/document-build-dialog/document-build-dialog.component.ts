import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { environment} from '@env/environment';

@Component({
  selector: 'app-document-build-dialog',
  templateUrl: './document-build-dialog.component.html',
  styleUrls: ['./document-build-dialog.component.css']
})
export class DocumentBuildDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DocumentBuildDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    public sanitizer: DomSanitizer
  ) { }

  getExariUrl() {
    if (environment.production) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(this.data);
    } else {
       return this.sanitizer.bypassSecurityTrustResourceUrl("http://localhost:4200/#/document-management/portal/login");
    }
  }
  ngOnInit() {
  }

}
