import {Notification} from '../models/notification.model';
import { TaskActionTypes, TaskActionsUnion} from "../actions/task.action";
import { Task} from '@app/core/model/workfront/Task.model';
import { CONFIG} from '../config';


export interface State {
  taskDataLoaded: boolean;
  taskDataLoading: boolean;
  taskData: Task;
  notification: Notification;
}

const initialState: State = {
  taskDataLoaded: false,
  taskDataLoading: false,
  taskData: null,
  notification: new Notification()
};

export function reducer(
  state = initialState,
  action: TaskActionsUnion
): State {
  switch (action.type) {
    case TaskActionTypes.TaskDataLoad: {
      const noti = new Notification();
      noti.display = true;
      noti.duration = null;
      noti.message = 'Loading Redactor Task Data...';
      return {
        ...state,
        taskDataLoading: true,
        notification: noti
      };
    }
    case TaskActionTypes.TaskDataLoadSuccess: {
      const noti = new Notification();
      noti.display = true;
      noti.duration = CONFIG.notificationDuration;
      noti.message = 'Redactor Task Loaded Successful';
      return {
        taskDataLoaded: true,
        taskDataLoading: false,
        taskData: action.payload,
        notification: noti
      };
    }
    case TaskActionTypes.TaskDataLoadError: {
      const noti = new Notification();
      noti.display = true;
      noti.duration = CONFIG.notificationDuration;
      noti.message = 'Task Data fails to load';
      return {
        ...state,
        notification: noti
      };
    }
    default: {
      return state;
    }
  }
}

export const getTaskDataLoaded = (state: State) => state.taskDataLoaded;
export const getTaskDataLoading = (state: State) => state.taskDataLoading;
export const getTaskData = (state: State) => state.taskData;
export const getNotification = (state: State) => state.notification;



