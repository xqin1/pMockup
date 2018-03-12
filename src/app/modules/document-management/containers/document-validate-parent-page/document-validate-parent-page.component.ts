import {Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import * as documentAction from 'app/modules/document-management/actions/document.action';
import * as fromDocument from 'app/modules/document-management/reducers/index.reducer';
import {Observable} from 'rxjs/Observable';
import { DocumentManagementService} from '@app/modules/document-management/services/document-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import {DocumentData} from '@app/modules/document-management/model/documant-data.model';
import {DocumentRegulatoryActionPayload} from '@app/modules/document-management/model/document-regulatory-action-paylaod.model';

@Component({
  selector: 'app-document-validate-parent-page',
  templateUrl: './document-validate-parent-page.component.html',
  styleUrls: ['./document-validate-parent-page.component.css']
})
export class DocumentValidateParentPageComponent implements OnInit {
  selectedDocument$: Observable<DocumentData>;
  selectedRegulatoryData$: Observable<DocumentRegulatoryActionPayload>;
  constructor(
    private documentManagementService: DocumentManagementService,
    private store: Store<fromDocument.State>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.selectedDocument$ = this.store.select((fromDocument.getSelectedDocument));
    this.selectedRegulatoryData$ = this.store.select(fromDocument.getSelectedRegulatoryAction);
  }

  ngOnInit() {
  }

  onCancelArchive(result: boolean) {
    if (result) {
      this.store.dispatch(new documentAction.Navigation_Index_Changed(0));
    }

  }

  onArchiveDocument(data: DocumentData) {
    this.store.dispatch(new documentAction.Navigation_Index_Changed(2));
    this.router.navigate(['/document-archive', 'confirmation', data.documentID]);
  }

}
