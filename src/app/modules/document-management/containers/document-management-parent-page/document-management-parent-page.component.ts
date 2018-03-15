import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromDocument from 'app/modules/document-management/reducers/index.reducer';

@Component({
  selector: 'app-document-management-parent-page',
  templateUrl: './document-management-parent-page.component.html',
  styleUrls: ['./document-management-parent-page.component.css']
})
export class DocumentManagementParentPageComponent implements OnInit {
  documentListLoading$: Observable<boolean>;
  constructor(
    private store: Store<fromDocument.State>,
  ) {
    this.documentListLoading$ = this.store.select((fromDocument.getDocumentListLoading));
  }

  ngOnInit() {
  }

}
