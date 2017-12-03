import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-parent-page',
  templateUrl: './document-parent-page.component.html',
  styleUrls: ['./document-parent-page.component.css']
})
export class DocumentParentPageComponent implements OnInit {
  headerTitle = 'Document Management';

  constructor() { }

  ngOnInit() {
  }

}
