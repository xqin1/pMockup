import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as doucmentAction from 'app/modules/document-management/actions/document.action';
import * as fromDocument from 'app/modules/document-management/reducers/index.reducer';
import {Observable} from 'rxjs/Observable';
import { DocumentManagementService} from '@app/modules/document-management/services/document-management.service';
import { DocumentList} from '@app/modules/document-management/model/document-list.model';
import { ActivatedRoute } from '@angular/router';
import {MatSlideToggleChange} from '@angular/material';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documentListLoading$: Observable<boolean>;
  documentListData: DocumentList = new DocumentList();
  showMoreInfoDocIDs: string[] = [];
  constructor(
    private documentManagementService: DocumentManagementService,
    private store: Store<fromDocument.State>,
    private route: ActivatedRoute
) {
    this.documentListLoading$ = this.store.select((fromDocument.getDocumentListLoading));
  }
  getArchivalEligibility(id: string): any{
    return this.documentManagementService.getEligibilityByDocumentId(id);
  }

  showMoreInfoToggle($event: MatSlideToggleChange, id:string){
    console.log($event);
    if ($event.checked) {
      this.showMoreInfoDocIDs.push(id);
    }else {
      this.showMoreInfoDocIDs = this.showMoreInfoDocIDs.filter( e => {
        return e !== id;
      });
    }
  }
  showMoreInfo(id: string): boolean {
    return this.showMoreInfoDocIDs.includes(id);
  }

  ngOnInit() {
    this.documentListLoading$.subscribe(data => {
        if (!data) {
          this.documentListData = this.documentManagementService.documentList;
        }

    });
  }

}
