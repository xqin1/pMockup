import { Action } from '@ngrx/store';
import {Task} from '@app/core/model/workfront/Task.model';

export enum TaskActionTypes {
  TaskListLoad = '[Task] Task List Load',
  TaskListLoadSuccess = '[Task] Task List Loaded',
  TaskListLoadError = '[Task] Task List Load Error',
  TaskLoad = '[Task] Task Load',
  TaskLoadSuccess = '[Task] Task Loaded',
  TaskLoadError = '[Task] Task Load Error',
  TaskSelected = '[Task] Task Selected'
}

export class TaskListLoad implements Action {
  readonly type = TaskActionTypes.TaskListLoad;

  constructor() {}
}

export class TaskListLoadSuccess implements Action {
  readonly type = TaskActionTypes.TaskListLoadSuccess;

  constructor(public payload: Task[]) {}
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

  constructor(public payload: Task) {}
}

export class TaskLoadError implements Action {
  readonly type = TaskActionTypes.TaskLoadError;

  constructor(public payload: string) {}
}

export class TaskSelected implements Action {
  readonly type = TaskActionTypes.TaskSelected;

  constructor(public payload: Task) {}
}

export type TaskActionsUnion =
  | TaskListLoad
  | TaskListLoadSuccess
  | TaskListLoadError
  | TaskLoad
  | TaskLoadSuccess
  | TaskLoadError
  | TaskSelected;
