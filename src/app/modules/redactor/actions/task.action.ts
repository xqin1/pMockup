import { Action } from '@ngrx/store';
import { Task} from '@app/core/model/workfront/Task.model';
import { Notification} from '@app/modules/redactor/models/notification.model';

export enum TaskActionTypes {
  TaskDataLoad = '[Task] Task Data Load',
  TaskDataLoadSuccess = '[Task] Task Data Loaded',
  TaskDataLoadError = '[Task] Task Data Load Error',
  SendNotification = '[Task] Send Notificaiton'
}

export class TaskDataLoad implements Action {
  readonly type = TaskActionTypes.TaskDataLoad;

  constructor(public payload: string) {}
}

export class TaskDataLoadSuccess implements Action {
  readonly type = TaskActionTypes.TaskDataLoadSuccess;
  constructor(public payload: Task) {}
}

export class TaskDataLoadError implements Action {
  readonly type = TaskActionTypes.TaskDataLoadError;
  constructor(public payload: string) {}
}

export class SendNotification implements Action {
  readonly type = TaskActionTypes.SendNotification;

  constructor(public payload: Notification) {}
}

export type TaskActionsUnion =
  | TaskDataLoad
  | TaskDataLoadSuccess
  | TaskDataLoadError
  | SendNotification;
