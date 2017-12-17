import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromDocument from 'app/modules/document-management/reducers/index.reducer';
import {Observable} from 'rxjs/Observable';
import { DocumentManagementService} from '@app/modules/document-management/services/document-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentData} from '@app/modules/document-management/model/documant-data.model';
import { environment} from '@env/environment';
import {Navigation} from '@app/modules/document-management/model/navigation.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documentListLoading$: Observable<boolean>;
  showMoreInfoDocIDs: string[] = [];
  @Input() documentDataList: DocumentData[];
  @Output() documentArchive= new EventEmitter<DocumentData>();
  workfrontHost = environment.workfrontHost;
  constructor(
    private documentManagementService: DocumentManagementService,
    private store: Store<fromDocument.State>,
    private route: ActivatedRoute,
    private router: Router
) {
    this.documentListLoading$ = this.store.select((fromDocument.getDocumentListLoading));
  }

  getShowDocumentLink(row: DocumentData) {
    return `${environment.workfrontHost}/document/view?ID=${row.documentID}`;
  }

  showMoreInfo(id: string): boolean {
    return this.showMoreInfoDocIDs.includes(id);
  }

  goToDocumentLink(id: string) {
    this.router.navigate([`../document-link/${id}`], {relativeTo: this.route});
  }

  doArchive(data: DocumentData) {
    console.log("do archive");
    console.log(data);
    this.documentArchive.emit(data);
  }
  ngOnInit() {
  }

}
