import { Action } from '@ngrx/store';
import { Task} from '@app/core/model/workfront/Task.model';
import { Notification} from '@app/modules/redactor/models/notification.model';
import {User} from '@app/core/model/workfront/User.model';

export enum UserActionTypes {
  UserDataLoad = '[User] User Data Load',
  UserDataLoadSuccess = '[User] User Data Loaded',
  UserDataLoadError = '[User] User Data Load Error',
}

export class UserDataLoad implements Action {
  readonly type = UserActionTypes.UserDataLoad;

  constructor(public payload: string) {}
}

export class UserDataLoadSuccess implements Action {
  readonly type = UserActionTypes.UserDataLoadSuccess;
  constructor(public payload: User) {}
}

export class UserDataLoadError implements Action {
  readonly type = UserActionTypes.UserDataLoadError;
  constructor(public payload: string) {}
}


export type UserActionsUnion =
  | UserDataLoad
  | UserDataLoadSuccess
  | UserDataLoadError;
