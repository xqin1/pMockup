import { Action } from '@ngrx/store';
import {Project} from '@app/core/model/workfront/Project.model';
import {Search} from '@app/modules/redactor/actions/search.action';


export enum SearchProjectActionTypes {
  SearchProject = '[Project] Search Project',
  SearchProjectComplete = '[Project] Search Project Complete',
  SearchProjectError = '[Project] Search Project Error',
  SearchProjectAccumulate = '[Project] Search Project Accumulate'
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

export type SearchProjectActionsUnion =
  | SearchProject
  | SearchProjectComplete
  | SearchProjectError
  | SearchProjectAccumulate;
