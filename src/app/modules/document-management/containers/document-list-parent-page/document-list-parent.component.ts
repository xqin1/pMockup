import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import * as doucmentAction from 'app/modules/document-management/actions/document.action';
import * as fromDocument from 'app/modules/document-management/reducers/index.reducer';
import {Observable} from 'rxjs/Observable';
import { DocumentManagementService} from '@app/modules/document-management/services/document-management.service';
import { DocumentList} from '@app/modules/document-management/model/document-list.model';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSlideToggleChange, MatStepper} from '@angular/material';
import {DocumentData} from '@app/modules/document-management/model/documant-data.model';

@Component({
  selector: 'app-document-list-parent',
  templateUrl: './document-list-parent.component.html',
  styleUrls: ['./document-list-parent.component.css']
})
export class DocumentListParentComponent implements OnInit {
  documentListLoading$: Observable<boolean>;
  documentDataList$: Observable<DocumentData[]>;
  constructor(
    private documentManagementService: DocumentManagementService,
    private store: Store<fromDocument.State>,
    private route: ActivatedRoute,
    private router: Router
) {
    this.documentListLoading$ = this.store.select((fromDocument.getDocumentListLoading));
    this.documentDataList$ = this.store.select(fromDocument.getDocumentDataList);
  }

  ngOnInit() {

  }

}
