import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromDocument from 'app/modules/document-management/reducers/index.reducer';
import {Observable} from 'rxjs/Observable';
import { DocumentManagementService} from '@app/modules/document-management/services/document-management.service';
import { DocumentData} from '@app/modules/document-management/model/documant-data.model';
import { environment} from '@env/environment';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documentListLoading$: Observable<boolean>;
  @Input() documentDataList: DocumentData[];
  @Output() documentArchive= new EventEmitter<DocumentData>();
  constructor(
    private documentManagementService: DocumentManagementService,
    private store: Store<fromDocument.State>,
) {
    this.documentListLoading$ = this.store.select((fromDocument.getDocumentListLoading));
  }

  getShowDocumentLink(row: DocumentData) {
    return `${environment.workfrontHost}/document/view?ID=${row.documentID}`;
  }

  archive(data: DocumentData) {
    this.documentArchive.emit(data);
  }
  ngOnInit() {
  }

}
