import { Action } from '@ngrx/store';
import {Project} from '@app/core/model/workfront/Project.model';


export enum SearchProjectActionTypes {
  SearchProject = '[Project] Search Project',
  SearchProjectComplete = '[Project] Search Project Complete',
  SearchProjectError = '[Project] Search Project Error',
}

export class SearchProject implements Action {
  readonly type = SearchProjectActionTypes.SearchProject;

  constructor(public payload: string) {}
}

export class SearchProjectComplete implements Action {
  readonly type = SearchProjectActionTypes.SearchProjectComplete;

  constructor(public payload: Project[]) {}
}

export class SearchProjectError implements Action {
  readonly type = SearchProjectActionTypes.SearchProjectError;

  constructor(public payload: string) {}
}

export type SearchProjectActionsUnion =
  | SearchProject
  | SearchProjectComplete
  | SearchProjectError;
