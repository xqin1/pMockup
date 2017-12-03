import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { PEFService} from '@app/core/services/pef.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
 import { forkJoin } from 'rxjs/observable/forkJoin';
import * as fromDocument from '@app/modules/document-management/reducers/document.reducer';
import * as documentAction from '@app/modules/document-management/actions/document.action';
import {DocumentManagementService} from '@app/modules/document-management/services/document-management.service';

@Injectable()
export class DocumentListResolverService implements Resolve<any> {
  documentListLoaded$: Observable<boolean>;
  constructor(
    private pefService: PEFService,
    private store: Store<fromDocument.State>,
    private documentManagementService: DocumentManagementService
  ) {
    this.documentListLoaded$ = this.store.select(fromDocument.getDocumentListLoaded);
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
        // return Observable.of(true);
          if (this.documentManagementService.documentListLoaded) {
            return of(true);
          } else {
              const objectId = route.params.id;
              this.store.dispatch(new documentAction.Document_List_Loading(true));
              this.pefService.getDocumentListByObjectID(objectId)
                .subscribe( results => {
                  this.documentManagementService.documentList = results;
                  this.documentManagementService.documentListLoaded = true;
                  this.store.dispatch(new documentAction.Document_List_Loading(false));
                  this.store.dispatch((new documentAction.Document_List_Loaded(true)));
                  return of(true);
                });
          }
  }
}
