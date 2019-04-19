import { Action } from '@ngrx/store';

export enum SearchProjectActionTypes {
  SearchProject = '[Project] Search Project',
  SearchProjectComplete = '[Project] Search Project Complete',
  SearchProjectError = '[Project] Search Project Error',
  SearchProjectAccumulate = '[Project] Search Project Accumulate',
  SelectProject = '[Project] Select Project',
  RemoveSelecttedProject = '[Project] Remove Selected Project',
  ConfirmProject = '[Project] Confirm Project',
  ConfirmProjectComplete = '[Project] Confirm Project Complete'
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

export class RemoveSelectedProject implements Action {
  readonly type = SearchProjectActionTypes.RemoveSelecttedProject;

  constructor(public payload: string) {}
}

export class ConfirmProject implements Action {
  readonly type = SearchProjectActionTypes.ConfirmProject;

  constructor(public payload: string) {}
}

export class ConfirmProjectComplete implements Action {
  readonly type = SearchProjectActionTypes.ConfirmProjectComplete;

  constructor(public payload: string[]) {}
}

export type SearchProjectActionsUnion =
  | SearchProject
  | SearchProjectComplete
  | SearchProjectError
  | SearchProjectAccumulate
  | SelectProject
  | RemoveSelectedProject
  | ConfirmProject
  | ConfirmProjectComplete;
