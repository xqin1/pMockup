import { Action } from '@ngrx/store';


export const DOCUMENT_LIST_LOADING = '[Document] Document List Loading';
export const DOCUMENT_LIST_LOADED = '[Document] Document List Loaded';



export class Document_List_Loading implements Action {
  readonly type = DOCUMENT_LIST_LOADING;
  constructor(public payload: boolean){}
}
export class Document_List_Loaded implements Action {
  readonly type = DOCUMENT_LIST_LOADED;
  constructor(public payload: boolean){}
}

export type Actions = Document_List_Loading
  | Document_List_Loaded;
