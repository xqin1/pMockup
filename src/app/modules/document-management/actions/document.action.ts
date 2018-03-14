import { Action } from '@ngrx/store';
import {DocumentListLoadPayload} from '@app/modules/document-management/model/document-list-load-payload.model';
import {DocumentData} from '@app/modules/document-management/model/documant-data.model';
import {DocumentRegulatoryActionPayload} from '@app/modules/document-management/model/document-regulatory-action-paylaod.model';
import {ValuePair} from '@app/modules/document-management/model/value-pair.model';
export const DOCUMENT_LIST_LOADING = '[Document] Document List Loading';
export const DOCUMENT_LIST_LOADED = '[Document] Document List Loaded';
export const DOCUMENT_SELECTED  = '[Document] Document Selected';
export const DOCUMENT_SELECTED_PDF_LOADING = '[Document] Document Selected PDF Loading';
export const DOCUMENT_SELECTED_PDF_LOADED = '[Document] Document Selected PDF Loaded';
export const DOCUMENT_REGULATORY_ACTION_UPDATE = '[Document] Document Regulatory Action Update';
export const DOCUMENT_REGULATORY_ACTION_UPDATED = '[Document] Document Regulatory Action Updated';



export class Document_List_Loading implements Action {
  readonly type = DOCUMENT_LIST_LOADING;
  constructor(public payload: boolean) {}
}
export class Document_List_Loaded implements Action {
  readonly type = DOCUMENT_LIST_LOADED;
  constructor(public payload: DocumentListLoadPayload) {}
}
export class Document_Selected implements Action {
  readonly type = DOCUMENT_SELECTED;
  constructor(public payload: string) {}
}
export class Document_Selected_PDF_Loading implements Action {
  readonly type = DOCUMENT_SELECTED_PDF_LOADING;
  constructor(public payload: boolean) {}
}
export class Document_Selected_PDF_Loaded implements Action {
  readonly type = DOCUMENT_SELECTED_PDF_LOADED;
  constructor(public payload: object) {}
}
export class Document_Regulatory_Action_Update implements Action {
  readonly type = DOCUMENT_REGULATORY_ACTION_UPDATE;
  constructor(public payload: string) {}
}
export class Document_Regulatory_Action_Updated implements Action {
  readonly type = DOCUMENT_REGULATORY_ACTION_UPDATED;
  constructor(public payload: DocumentRegulatoryActionPayload) {}
}

export type Actions = Document_List_Loading
  | Document_List_Loaded
  | Document_Selected
  | Document_Selected_PDF_Loading
  | Document_Selected_PDF_Loaded
  | Document_Regulatory_Action_Update
  | Document_Regulatory_Action_Updated;
