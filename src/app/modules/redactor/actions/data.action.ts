import { Action } from '@ngrx/store';
import { Task} from '@app/core/model/workfront/Task.model';
import { Notification} from '@app/modules/redactor/models/notification.model';

export enum DataActionTypes {
  TaskDataLoad = '[Data] Task Data Load',
  TaskDataLoadSuccess = '[Data] Task Data Loaded',
  TaskDataLoadError = '[Data] Task Data Load Error',
  SendNotification = '[Data] Send Notificaiton'
}

export class TaskDataLoad implements Action {
  readonly type = DataActionTypes.TaskDataLoad;

  constructor() {}
}

export class TaskDataLoadSuccess implements Action {
  readonly type = DataActionTypes.TaskDataLoadSuccess;
  constructor(public payload: Task) {}
}

export class TaskDataLoadError implements Action {
  readonly type = DataActionTypes.TaskDataLoadError;
  constructor(public payload: string) {}
}

export class SendNotification implements Action {
  readonly type = DataActionTypes.SendNotification;

  constructor(public payload: Notification) {}
}

export type DataActionsUnion =
  | TaskDataLoad
  | TaskDataLoadSuccess
  | TaskDataLoadError
  | SendNotification;
