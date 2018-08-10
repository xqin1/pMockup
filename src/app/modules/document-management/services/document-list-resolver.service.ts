import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { PEFService} from '@app/core/services/pef.service';
import { DMService} from '@app/core/services/dm.service';
import { Observable ,  of ,  forkJoin } from 'rxjs';
import * as fromDocument from '@app/modules/document-management/reducers/document.reducer';
import * as documentAction from '@app/modules/document-management/actions/document.action';
import {DocumentManagementService} from '@app/modules/document-management/services/document-management.service';
import {DocumentListLoadPayload} from '@app/modules/document-management/model/document-list-load-payload.model';
import {DocumentList} from '@app/modules/document-management/model/document-list.model';
import {DocumentConfig} from '@app/modules/document-management/config';
import {Eligibility} from '@app/modules/document-management/model/eligibility.model';

@Injectable()
export class DocumentListResolverService implements Resolve<any> {
  documentListLoaded$: Observable<boolean>;
  constructor(
    private pefService: PEFService,
    private dmService: DMService,
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
              const objectId = route.params.objectId;
              const userId = route.params.userId;
              this.store.dispatch(new documentAction.Document_List_Loading(true));
              this.dmService.getDocumentListByObjectId(objectId)
                .subscribe( documentList => {
                  // TODO: comment the following line when deploying
                  //   documentList = DocumentConfig.fakeDocumentList;
                  if (documentList.length > 0) {
                    const results = new DocumentList();
                    results.documents = [];
                    results.eligibility = [];
                    results.documents = documentList;
                    results.objectCode = documentList[0].topDocObjCode;

                    const eligibilityCheckIDs: string[] = this.documentManagementService.getEligibilityCheckIDs(results);
                    const eligibilityRequestList: any[] = [];
                    for (const id of eligibilityCheckIDs) {
                      eligibilityRequestList.push(this.dmService.getArchivalEligibilityByDocumentIdAndUserId(id, userId));
                    }
                    forkJoin(eligibilityRequestList).subscribe(eligibilityList => {
                      for (const eligibility of eligibilityList) {
                        const e = new Eligibility();
                        e.documentId = eligibility["documentId"];
                        e.archivalEligible = eligibility["eligible"];
                        e.reason = eligibility["reasons"];
                        results.eligibility.push(e);
                      }
                      const payload = new DocumentListLoadPayload();
                      //
                      payload.documentListData = this.documentManagementService.processDocumentList(results, userId, objectId);
                      console.log(payload);
                      this.documentManagementService.documentListLoaded = true;
                      this.store.dispatch(new documentAction.Document_List_Loading(false));
                      this.store.dispatch((new documentAction.Document_List_Loaded(payload)));
                      return of(true);
                    });
                  }else{
                    const payload = new DocumentListLoadPayload();
                    this.store.dispatch(new documentAction.Document_List_Loading(false));
                    this.store.dispatch((new documentAction.Document_List_Loaded(payload)));
                    return of(true);
                  }

                });
          }
  }
}
