import { Action } from '@ngrx/store';
import { TaskData} from '@app/modules/document-management/model/task-data.model';

export enum TaskActionTypes {
  TaskListLoad = '[Task] Task List Load',
  TaskListLoadSuccess = '[Task] Task List Loaded',
  TaskListLoadError = '[Task] Task List Load Error',
  TaskLoad = '[Task] Task Load',
  TaskLoadSuccess = '[Task] Task Loaded',
  TaskLoadError = '[Task] Task Load Error',
  TaskSelected = '[Task] Task Selected',
  DocumentBuild = '[Task] Document Biild',
  DocumentSelected = '[Task] Document Selected'
}

export class TaskListLoad implements Action {
  readonly type = TaskActionTypes.TaskListLoad;

  constructor() {}
}

export class TaskListLoadSuccess implements Action {
  readonly type = TaskActionTypes.TaskListLoadSuccess;

  constructor(public payload: TaskData[]) {}
}

export class TaskListLoadError implements Action {
  readonly type = TaskActionTypes.TaskListLoadError;

  constructor(public payload: string) {}
}

export class TaskLoad implements Action {
  readonly type = TaskActionTypes.TaskLoad;

  constructor(public payload: string) {}
}

export class TaskLoadSuccess implements Action {
  readonly type = TaskActionTypes.TaskLoadSuccess;

  constructor(public payload: TaskData) {}
}

export class TaskLoadError implements Action {
  readonly type = TaskActionTypes.TaskLoadError;

  constructor(public payload: string) {}
}

export class TaskSelected implements Action {
  readonly type = TaskActionTypes.TaskSelected;

  constructor(public payload: TaskData) {}
}

export class DocumentBuild implements Action {
  readonly type = TaskActionTypes.DocumentBuild;

  constructor(public payload: string) {}
}


export class DocumentSelected implements Action {
  readonly type = TaskActionTypes.DocumentSelected;

  constructor(public payload: string) {}
}

export type TaskActionsUnion =
  | TaskListLoad
  | TaskListLoadSuccess
  | TaskListLoadError
  | TaskLoad
  | TaskLoadSuccess
  | TaskLoadError
  | TaskSelected
  | DocumentBuild
  | DocumentSelected;
