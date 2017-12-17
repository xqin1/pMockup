import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as documentAction from 'app/modules/document-management/actions/document.action';
import * as fromDocument from 'app/modules/document-management/reducers/index.reducer';
import {Observable} from 'rxjs/Observable';
import { DocumentManagementService} from '@app/modules/document-management/services/document-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import {DocumentData} from '@app/modules/document-management/model/documant-data.model';
@Component({
  selector: 'app-document-confirmation-parent-page',
  templateUrl: './document-confirmation-parent-page.component.html',
  styleUrls: ['./document-confirmation-parent-page.component.css']
})
export class DocumentConfirmationParentPageComponent implements OnInit {
  selectedDocument$: Observable<DocumentData>;
  constructor(
    private documentManagementService: DocumentManagementService,
    private store: Store<fromDocument.State>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.selectedDocument$ = this.store.select((fromDocument.getSelectedDocument));
  }

  ngOnInit() {
  }

  onDoneArchive(result: boolean) {
    if (result) {
      this.store.dispatch(new documentAction.Navigation_Index_Changed(0));
    }

  }

}
