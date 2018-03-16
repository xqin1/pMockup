import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import * as documentAction from 'app/modules/document-management/actions/document.action';
import * as fromDocument from 'app/modules/document-management/reducers/index.reducer';
import {Observable} from 'rxjs/Observable';
import { DocumentManagementService} from '@app/modules/document-management/services/document-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import {DocumentData} from '@app/modules/document-management/model/documant-data.model';
import {ValuePair} from '@app/modules/document-management/model/value-pair.model';
import {DocumentRegulatoryActionPayload} from '@app/modules/document-management/model/document-regulatory-action-paylaod.model';

@Component({
  selector: 'app-document-list-parent',
  templateUrl: './document-list-parent.component.html',
  styleUrls: ['./document-list-parent.component.css']
})
export class DocumentListParentComponent implements OnInit {
  documentListLoading$: Observable<boolean>;
  documentDataList$: Observable<DocumentData[]>;
  documentRegulatoryActionList$: Observable<DocumentRegulatoryActionPayload[]>;
  selectedDocumentID$: Observable<string>;
  constructor(
    private documentManagementService: DocumentManagementService,
    private store: Store<fromDocument.State>,
    private route: ActivatedRoute,
    private router: Router
) {
    this.documentListLoading$ = this.store.select((fromDocument.getDocumentListLoading));
    this.documentDataList$ = this.store.select(fromDocument.getDocumentDataList);
    this.selectedDocumentID$ = this.store.select(fromDocument.getSelectedDocumentID);
  }

  ngOnInit() {
  }
  onDocumentSelected(documentID: string) {
    this.store.dispatch(new documentAction.Document_Selected(documentID));
  }
  onDocumentValidate(documentID: string) {
    this.router.navigate(['/document-archive', 'validation', documentID]);
  }
  onRegulatoryData(documentId: string) {
    this.store.dispatch(new documentAction.Document_Selected(documentId));
   this.store.dispatch(new documentAction.Document_Regulatory_Action_Update(documentId));
  }
}
