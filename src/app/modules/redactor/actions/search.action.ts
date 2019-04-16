import { Action } from '@ngrx/store';


export enum SearchActionTypes {
  Search = '[AppNumber] Search',
  SearchComplete = '[AppNumber] Search Complete',
  SearchError = '[AppNumber] Search Error',
}

export class Search implements Action {
  readonly type = SearchActionTypes.Search;

  constructor(public payload: string) {}
}

export class SearchComplete implements Action {
  readonly type = SearchActionTypes.SearchComplete;

  constructor(public payload: number[]) {}
}

export class SearchError implements Action {
  readonly type = SearchActionTypes.SearchError;

  constructor(public payload: string) {}
}

export type SearchActionsUnion =
  | Search
  | SearchComplete
  | SearchError;
