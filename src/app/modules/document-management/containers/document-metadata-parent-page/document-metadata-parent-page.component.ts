import {Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import * as documentAction from 'app/modules/document-management/actions/document.action';
import * as fromDocument from 'app/modules/document-management/reducers/index.reducer';
import {Observable} from 'rxjs/Observable';
import { DocumentManagementService} from '@app/modules/document-management/services/document-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import {DocumentData} from '@app/modules/document-management/model/documant-data.model';
import {DocumentRegulatoryActionPayload} from '@app/modules/document-management/model/document-regulatory-action-paylaod.model';
import {LoadingStatus} from '@app/modules/document-management/model/loading-status.model';

@Component({
  selector: 'app-document-metadata-parent-page',
  templateUrl: './document-metadata-parent-page.component.html',
  styleUrls: ['./document-metadata-parent-page.component.css']
})
export class DocumentMetadataParentPageComponent implements OnInit {
  selectedDocument$: Observable<DocumentData>;
  regulatoryDataLoadingStatus$: Observable<LoadingStatus>;
  constructor(
    private documentManagementService: DocumentManagementService,
    private store: Store<fromDocument.State>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.selectedDocument$ = this.store.select((fromDocument.getSelectedDocument));
    this.regulatoryDataLoadingStatus$ = this.store.select((fromDocument.getRegulatoryLoadingStatus));
  }

  ngOnInit() {
  }

  onCancelArchive(result: boolean) {
    if (result) {
    }

  }

  onArchiveDocument(data: DocumentData) {
    this.router.navigate(['/document-archive', 'confirmation', data.documentID]);
  }

}
