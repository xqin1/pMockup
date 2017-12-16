import { Action } from '@ngrx/store';
import {DocumentData} from '@app/modules/document-management/model/documant-data.model';


export const DOCUMENT_LIST_LOADING = '[Document] Document List Loading';
export const DOCUMENT_LIST_LOADED = '[Document] Document List Loaded';
export const DOCUMENT_SELECTED  = '[Document] Document Selected';
export const DOCUMENT_SELECTED_REGULATORY_LOADING = '[Document] Document Selected Regulatory Loading';
export const DOCUMENT_SELECTED_REGULATORY_LOADED = '[Document] Document Selected Regulatory Loaded';
export const DOCUMENT_SELECTED_PDF_LOADING = '[Document] Document Selected PDF Loading';
export const DOCUMENT_SELECTED_PDF_LOADED = '[Document] Document Selected PDF Loaded';



export class Document_List_Loading implements Action {
  readonly type = DOCUMENT_LIST_LOADING;
  constructor(public payload: boolean) {}
}
export class Document_List_Loaded implements Action {
  readonly type = DOCUMENT_LIST_LOADED;
  constructor(public payload: DocumentData[]) {}
}
export class Document_Selected_Regulatory_Loading implements Action {
  readonly type = DOCUMENT_SELECTED_REGULATORY_LOADING;
  constructor(public payload: boolean) {}
}
export class Document_Selected_Regulatory_Loaded implements Action {
  readonly type = DOCUMENT_SELECTED_REGULATORY_LOADED;
  constructor(public payload: object) {}
}
export class Document_Selected_PDF_Loading implements Action {
  readonly type = DOCUMENT_SELECTED_PDF_LOADING;
  constructor(public payload: boolean) {}
}
export class Document_Selected_PDF_Loaded implements Action {
  readonly type = DOCUMENT_SELECTED_PDF_LOADED;
  constructor(public payload: object) {}
}

export type Actions = Document_List_Loading
  | Document_List_Loaded
  | Document_Selected_Regulatory_Loading
  | Document_Selected_Regulatory_Loaded
  | Document_Selected_PDF_Loading
  | Document_Selected_PDF_Loaded;
