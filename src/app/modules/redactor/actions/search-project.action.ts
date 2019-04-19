import { Action } from '@ngrx/store';
import { RedactorUpdateNote} from '@app/modules/redactor/models/redactor-update-note.model';

export enum SearchProjectActionTypes {
  SearchProject = '[Project] Search Project',
  SearchProjectComplete = '[Project] Search Project Complete',
  SearchProjectError = '[Project] Search Project Error',
  SearchProjectAccumulate = '[Project] Search Project Accumulate',
  SelectProject = '[Project] Select Project',
  RemoveSelectedProject = '[Project] Remove Selected Project',
  UpdateRedactorProject = '[Project] Update Project',
  UpdateRedactorProjectComplete = '[Project] Update Project Complete',
  UpdateRedactorProjectError = '[Project] Update Project Error',
  AttachTemplate = '[Project] Attach Template',
  AttachTemplateComplete = '[Project] Attach Template Complete',
  AttachTemplateError = '[Project] Attach Template Error',
  AttachAllTemplateComplete = '[Project] Attach All Template Complete',
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
  readonly type = SearchProjectActionTypes.RemoveSelectedProject;

  constructor(public payload: string) {}
}

export class UpdateRedactorProject implements Action {
  readonly type = SearchProjectActionTypes.UpdateRedactorProject;

  constructor(public payload: string) {}
}

export class UpdateRedactorProjectComplete implements Action {
  readonly type = SearchProjectActionTypes.UpdateRedactorProjectComplete;
}

export class UpdateRedactorProjectError implements Action {
  readonly type = SearchProjectActionTypes.UpdateRedactorProjectError;

  constructor(public payload: string) {}
}

export class AttachTemplate implements Action {
  readonly type = SearchProjectActionTypes.AttachTemplate;

  constructor(public payload: string) {}
}

export class AttachTemplateComplete implements Action {
  readonly type = SearchProjectActionTypes.AttachTemplateComplete;
  constructor(public payload: string) {}
}

export class AttachTemplateError implements Action {
  readonly type = SearchProjectActionTypes.AttachTemplateError;

  constructor(public payload: string) {}
}

export class AttachAllTemplateComplete implements Action {
  readonly type = SearchProjectActionTypes.AttachAllTemplateComplete;
}

export type SearchProjectActionsUnion =
  | SearchProject
  | SearchProjectComplete
  | SearchProjectError
  | SearchProjectAccumulate
  | SelectProject
  | RemoveSelectedProject
  | UpdateRedactorProject
  | UpdateRedactorProjectComplete
  | UpdateRedactorProjectError
  | AttachTemplate
  | AttachTemplateComplete
  | AttachTemplateError
  | AttachAllTemplateComplete;
