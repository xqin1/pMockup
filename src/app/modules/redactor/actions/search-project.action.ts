import { Action } from '@ngrx/store';
import { RedactorUpdateNote} from '@app/modules/redactor/models/redactor-update-note.model';

export enum SearchProjectActionTypes {
  SearchProject = '[Project] Search Project',
  SearchProjectComplete = '[Project] Search Project Complete',
  SearchProjectError = '[Project] Search Project Error',
  SearchProjectAccumulate = '[Project] Search Project Accumulate',
  SelectProject = '[Project] Select Project',
  RemoveSelecttedProject = '[Project] Remove Selected Project',
  UpdateProject = '[Project] Update Project',
  UpdateProjectComplete = '[Project] Update Project Complete',
  UpdateProjectError = '[Project] Update Project Error',
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
  readonly type = SearchProjectActionTypes.RemoveSelecttedProject;

  constructor(public payload: string) {}
}

export class UpdateProject implements Action {
  readonly type = SearchProjectActionTypes.UpdateProject;

  constructor(public payload: RedactorUpdateNote) {}
}

export class UpdateProjectComplete implements Action {
  readonly type = SearchProjectActionTypes.UpdateProjectComplete;
}

export class UpdateProjectError implements Action {
  readonly type = SearchProjectActionTypes.UpdateProjectError;

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
  | UpdateProject
  | UpdateProjectComplete
  | UpdateProjectError
  | AttachTemplate
  | AttachTemplateComplete
  | AttachTemplateError
  | AttachAllTemplateComplete;
