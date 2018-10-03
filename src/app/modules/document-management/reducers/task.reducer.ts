import { TaskActionTypes, TaskActionsUnion} from '@app/modules/document-management/actions/task.action';
import {TaskData} from '@app/modules/document-management/model/task-data.model';
import {Notification} from '@app/modules/document-management/model/notification.model';
import { DocumentConfig} from '@app/modules/document-management/config';

export interface State {
  taskListLoaded: boolean;
  taskListLoading: boolean;
  taskList: TaskData[];
  selectedTaskId: string;
  taskLoadingIds: string[];
  selectedDocumentId: string;
  notification: Notification;
}

const initialState: State = {
  taskListLoaded: false,
  taskListLoading: false,
  taskList: [],
  selectedTaskId: null,
  taskLoadingIds: [],
  selectedDocumentId: null,
  notification: null
};

export function reducer(
  state = initialState,
  action: TaskActionsUnion
): State {
  switch (action.type) {
    case TaskActionTypes.TaskListLoad: {
      const notification = new Notification();
      notification.display = true;
      notification.duration = null;
      notification.message = 'Loading Task List...';
      return {
        ...state,
        taskListLoading: true,
        notification: notification
      };
    }
    case TaskActionTypes.TaskListLoadSuccess: {
      let selectedTaskId = state.selectedTaskId;
      let selectedDocumentId = state.selectedDocumentId;
      if (state.selectedTaskId === null) {
        selectedTaskId = action.payload[0].task.ID;
        if (action.payload[0].task.documents.length === 1) {
          selectedDocumentId = action.payload[0].task.documents[0].ID;
        }
      }
      const notification = new Notification();
      notification.display = true;
      notification.duration = DocumentConfig.notificationSetting.duration;
      notification.message = 'Task List Loaded Successful';
      return {
        taskListLoaded: true,
        taskListLoading: false,
        taskList: action.payload,
        selectedTaskId: selectedTaskId,
        taskLoadingIds: [],
        selectedDocumentId: selectedDocumentId,
        notification: notification
      };
    }
    case TaskActionTypes.TaskListLoadError: {
      const notification = new Notification();
      notification.display = true;
      notification.duration = DocumentConfig.notificationSetting.duration;
      notification.message = 'Task List fails to load';
      return {
        ...state,
        notification: notification

      };
    }
    case TaskActionTypes.TaskSelected: {
      let selectedDocumentId = null;
      if (action.payload.task.documents.length === 1) {
        selectedDocumentId = action.payload.task.documents[0].ID;
      }
      return {
        ...state,
        selectedTaskId: action.payload.task.ID,
        selectedDocumentId: selectedDocumentId
      };
    }
    case TaskActionTypes.DocumentSelected: {
      return {
        ...state,
        selectedDocumentId: action.payload
      };
    }
    case TaskActionTypes.TaskLoad: {
      const ids = [].concat((state.taskLoadingIds));
      if (!ids.includes(action.payload)) {
        ids.push(action.payload);
      }
      const notification = new Notification();
      notification.display = true;
      notification.duration = null;
      notification.message = 'Loading Task...';
      return {
        ...state,
        taskLoadingIds: ids,
        notification: notification
      };
    }
    case TaskActionTypes.TaskLoadSuccess: {
      const ids = [].concat((state.taskLoadingIds));
      const newTaskList = [].concat((state.taskList));
      newTaskList.forEach((item, index) => {
        if (item.task.ID === action.payload.task.ID) {
          newTaskList[index] = action.payload;
        }
      });
      const notification = new Notification();
      notification.display = true;
      notification.duration = DocumentConfig.notificationSetting.duration;
      notification.message = 'Task Loaded Successful';
      return {
        ...state,
        taskList: newTaskList,
        taskLoadingIds: ids.filter(id => id !== action.payload.task.ID),
        notification: notification

      };
    }
    case TaskActionTypes.TaskLoadError: {
      const ids = [].concat((state.taskLoadingIds));
      const notification = new Notification();
      notification.display = true;
      notification.duration = DocumentConfig.notificationSetting.duration;
      notification.message = 'Task failed to load';
      return {
        ...state,
        notification: notification,
        taskLoadingIds: ids.filter(id => id !== action.payload),

      };
    }
    case TaskActionTypes.DocumentUploadStart: {
      const notification = new Notification();
      notification.display = true;
      notification.duration = null;
      notification.message = 'Uploading document...';
      return {
        ...state,
        notification: notification
      };
    }
    case TaskActionTypes.DocumentUploadSuccess: {
        const notification = new Notification();
        notification.display = true;
        notification.duration = DocumentConfig.notificationSetting.duration;
        notification.message = 'Document upload successful...';
        return {
          ...state,
          notification: notification
        };
    }
    case TaskActionTypes.DocumentUploadError: {
      const notification = new Notification();
      notification.display = true;
      notification.duration = DocumentConfig.notificationSetting.duration;
      notification.message = 'Document upload failed...';
      return {
        ...state,
        notification: notification
      };
    }

    default: {
      return state;
    }
  }
}

export const getTaskListLoaded = (state: State) => state.taskListLoaded;

export const getTaskListLoading = (state: State) => state.taskListLoading;

export const getTaskList = (state: State) => state.taskList;

export const getNumberOfTasks = (state: State) => state.taskList.length;

export const getSelectedTaskId = (state: State) => state.selectedTaskId;

export const getTaskLoadIds = (state: State) => state.taskLoadingIds;

export const getSelectedDocumentId = (state: State) => state.selectedDocumentId;

export const getNotification = (state: State) => state.notification;



