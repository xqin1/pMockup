import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromDocument from 'app/modules/document-management/reducers/index.reducer';
import * as documentAction from '@app/modules/document-management/actions/document.action';

@Component({
  selector: 'app-document-archive-parent-page',
  templateUrl: './document-archive-parent-page.component.html',
  styleUrls: ['./document-archive-parent-page.component.css']
})
export class DocumentArchiveParentPageComponent implements OnInit {
  documentListLoading$: Observable<boolean>;
  constructor(
    private store: Store<fromDocument.State>,
  ) {
    this.documentListLoading$ = this.store.select((fromDocument.getDocumentListLoading));
  }

  ngOnInit() {
  }

}
