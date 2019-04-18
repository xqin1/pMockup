import { Action } from '@ngrx/store';


export enum SearchAppNumActionTypes {
  SearchAppNum = '[Search AppNumber] Search App Num',
  SearchAppNumComplete = '[Search AppNumber] Search App Num Complete',
  SearchAppNumError = '[Search AppNumber] Search App Num Error'
}

export class SearchAppNum implements Action {
  readonly type = SearchAppNumActionTypes.SearchAppNum;

  constructor(public payload: string) {}
}

export class SearchAppNumComplete implements Action {
  readonly type = SearchAppNumActionTypes.SearchAppNumComplete;

  constructor(public payload: number[]) {}
}

export class SearchAppNumError implements Action {
  readonly type = SearchAppNumActionTypes.SearchAppNumError;

  constructor(public payload: string) {}
}

export type SearchAppNumActionsUnion =
  | SearchAppNum
  | SearchAppNumComplete
  | SearchAppNumError;
