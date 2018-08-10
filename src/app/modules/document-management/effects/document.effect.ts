import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable ,  EMPTY as empty ,  of } from 'rxjs';
import { DMService} from '@app/core/services/dm.service';
import * as documentAction from '@app/modules/document-management/actions/document.action.ts';
import { DocumentRegulatoryActionPayload} from '@app/modules/document-management/model/document-regulatory-action-paylaod.model';
import { DocumentManagementService} from '@app/modules/document-management/services/document-management.service';
import {
  map,
  mergeMap,
  skip,
  takeUntil,
  catchError,
} from 'rxjs/operators';
import {RegulatoryData} from '@app/modules/document-management/model/regulatory-data.model';

@Injectable()
export class DocumentEffects {
  constructor(
    private actions$: Actions,
    private dmService: DMService,
    private documentManagementService: DocumentManagementService
  ){}

  @Effect()
  regulatoryDataUpdate$: Observable<Action> = this.actions$
    .pipe(
      ofType(documentAction.DOCUMENT_REGULATORY_ACTION_UPDATE),
      map((action: documentAction.Document_Regulatory_Action_Update) => action.payload),
      mergeMap((documentId: string) => this.dmService.getRegulatoryActionByDocumentID(documentId)
        .pipe(
            map((results: RegulatoryData) => {
              const ra = new DocumentRegulatoryActionPayload();
              ra.documentID = documentId;
              if (results.regulatoryActionExist) {
                ra.regulatoryActions = this.documentManagementService.setRegulatoryActionData(results.regulatoryActions);
              }else{
                ra.regulatoryActions = [];
              }
              return ra;
            }),
            map((results: DocumentRegulatoryActionPayload) => new documentAction.Document_Regulatory_Action_Updated(results))
      )
    ));
}
