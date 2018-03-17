import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import * as documentAction from 'app/modules/document-management/actions/document.action';
import * as fromDocument from 'app/modules/document-management/reducers/index.reducer';
import {Observable} from 'rxjs/Observable';
import { DocumentManagementService} from '@app/modules/document-management/services/document-management.service';
import {DocumentData} from '@app/modules/document-management/model/documant-data.model';

@Component({
  selector: 'app-document-list-parent',
  templateUrl: './document-list-parent.component.html',
  styleUrls: ['./document-list-parent.component.css']
})
export class DocumentListParentComponent implements OnInit {
  documentListLoading$: Observable<boolean>;
  documentDataList$: Observable<DocumentData[]>;
  selectedDocumentId$: Observable<string>;
  constructor(
    private documentManagementService: DocumentManagementService,
    private store: Store<fromDocument.State>,
) {
    this.documentListLoading$ = this.store.select((fromDocument.getDocumentListLoading));
    this.documentDataList$ = this.store.select(fromDocument.getDocumentDataList);
    this.selectedDocumentId$ = this.store.select(fromDocument.getSelectedDocumentID);
  }

  ngOnInit() {
  }
  onDocumentSelected(documentID: string) {
    this.store.dispatch(new documentAction.Document_Selected(documentID));
  }
  onDocumentLinkData(documentID: string) {
    console.log("document linking")
    // this.store.dispatch(new documentAction.Document_Regulatory_Action_Update(documentId));
  }
  onRegulatoryData(documentId: string) {
   this.store.dispatch(new documentAction.Document_Regulatory_Action_Update(documentId));
  }
}
