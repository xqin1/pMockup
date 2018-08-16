import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {DocumentData} from 'app/modules/document-management/model/documant-data.model';
import {Store} from '@ngrx/store';
import * as fromDocument from 'app/modules/document-management/reducers/index.reducer';

@Component({
  selector: 'app-document-eligibility-parent',
  templateUrl: './document-eligibility-parent.component.html',
  styleUrls: ['./document-eligibility-parent.component.css']
})
export class DocumentEligibilityParentComponent implements OnInit {
  selectedDocument$: Observable<DocumentData>;
  constructor(
    private store: Store<fromDocument.State>,
  ) {
    this.selectedDocument$ = this.store.select((fromDocument.getSelectedDocument));
  }

  ngOnInit() {
  }

}
