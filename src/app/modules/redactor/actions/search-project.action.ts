import { Action } from '@ngrx/store';

export enum SearchProjectActionTypes {
  SearchProject = '[Project] Search Project',
  SearchProjectComplete = '[Project] Search Project Complete',
  SearchProjectError = '[Project] Search Project Error',
  SearchProjectAccumulate = '[Project] Search Project Accumulate',
  SelectProject = '[Project] Select Project'
}

export class SearchProject implements Action {
  readonly type = SearchProjectActionTypes.SearchProject;

  constructor(public payload: string) {}
}

export class SearchProjectComplete implements Action {
  readonly type = SearchProjectActionTypes.SearchProjectComplete;

  constructor(public payload: string[]) {}
}

export class SearchProjectError implements Action {
  readonly type = SearchProjectActionTypes.SearchProjectError;

  constructor(public payload: string) {}
}

export class SearchProjectAccumulate implements Action {
  readonly type = SearchProjectActionTypes.SearchProjectAccumulate;

  constructor(public payload: boolean) {}
}

export class SelectProject implements Action {
  readonly type = SearchProjectActionTypes.SelectProject;

  constructor(public payload: string[]) {}
}

export type SearchProjectActionsUnion =
  | SearchProject
  | SearchProjectComplete
  | SearchProjectError
  | SearchProjectAccumulate
  | SelectProject;
