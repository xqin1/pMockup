import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromDocument from 'app/modules/document-management/reducers/index.reducer';
import { Navigation} from '@app/modules/document-management/model/navigation.model';
import * as documentAction from '@app/modules/document-management/actions/document.action';

@Component({
  selector: 'app-document-archive-parent-page',
  templateUrl: './document-archive-parent-page.component.html',
  styleUrls: ['./document-archive-parent-page.component.css']
})
export class DocumentArchiveParentPageComponent implements OnInit {
  documentListLoading$: Observable<boolean>;
  navIndex$: Observable<number>;
  objectId$: Observable<string>;
  userId$: Observable<string>;
  constructor(
    private store: Store<fromDocument.State>,
  ) {
    this.documentListLoading$ = this.store.select((fromDocument.getDocumentListLoading));
    this.navIndex$ = this.store.select(fromDocument.getNavigationIndex);
    this.objectId$ = this.store.select(fromDocument.getObjectId);
    this.userId$ = this.store.select((fromDocument.getUserId));
  }

  ngOnInit() {
  }

  onNavIndexChange($event: Navigation) {
    this.store.dispatch(new documentAction.Navigation_Index_Changed($event.index));
  }

}
