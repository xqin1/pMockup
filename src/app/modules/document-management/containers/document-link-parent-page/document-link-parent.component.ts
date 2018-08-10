import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DocumentManagementService} from '@app/modules/document-management/services/document-management.service';
import {Store} from '@ngrx/store';
import * as fromDocument from '@app/modules/document-management/reducers/index.reducer';
import {Observable} from 'rxjs';
import {LoadingStatus} from '@app/modules/document-management/model/loading-status.model';
import {DocumentData} from '@app/modules/document-management/model/documant-data.model';

@Component({
  selector: 'app-document-link-parent',
  templateUrl: './document-link-parent.component.html',
  styleUrls: ['./document-link-parent.component.css']
})
export class DocumentLinkParentComponent implements OnInit {
  selectedDocument$: Observable<DocumentData>;
  documentLinkDataLoadingStatus$: Observable<LoadingStatus>;
  constructor(
    private documentManagementService: DocumentManagementService,
    private store: Store<fromDocument.State>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.selectedDocument$ = this.store.select((fromDocument.getSelectedDocument));
    this.documentLinkDataLoadingStatus$ = this.store.select((fromDocument.getRegulatoryLoadingStatus));
  }

  ngOnInit() {
  }

}
