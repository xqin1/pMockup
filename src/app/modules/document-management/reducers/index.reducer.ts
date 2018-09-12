import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '@app/reducers';
import * as fromTask from './task.reducer';


export interface DocumentManagementState {
  task: fromTask.State;

}

export interface State extends fromRoot.State {
  documentManagement: DocumentManagementState;
}

export const reducers = {
  task: fromTask.reducer
};

export const getDocumentManagementState = createFeatureSelector<State, DocumentManagementState>('documentManagement');

// for task state
export const getTaskState = createSelector(
  getDocumentManagementState,
  state => state.task
);

export const getTaskListLoading = createSelector(
  getTaskState,
  fromTask.getTaskListLoading
);

export const getTaskListLoaded = createSelector(
  getTaskState,
  fromTask.getTaskListLoaded
);

export const getTaskList = createSelector(
  getTaskState,
  fromTask.getTaskList
);

export const getSelectedTaskId = createSelector(
  getTaskState,
  fromTask.getSelectedTaskId
);

export const getSelectedTask = createSelector(
  getTaskList,
  getSelectedTaskId,
  (tasks, id) => {
  //  console.log("select task being called");
    return tasks.filter(t => t.task.ID === id)[0];
  }
);

export const getNumberOfTasks = createSelector(
  getTaskState,
  fromTask.getNumberOfTasks
);


export const getTaskLoadIds = createSelector(
  getTaskState,
  fromTask.getTaskLoadIds
);

export const getSelectedDocumentId = createSelector(
  getTaskState,
  fromTask.getSelectedDocumentId
);

export const getActiveDocument = createSelector(
  getSelectedTask,
  getSelectedDocumentId,
  (task, id) => {
    if (task !== null && task.task !== null && task.task.documents !== null && task.task.documents.length === 1) {
      return task.task.documents[0];
    }else if (task !== null && task.task !== null && task.task.documents !== null && task.task.documents.length > 1) {
      return task.task.documents.filter(d => d.ID === id)[0];
    }else{
      return null;
    }
  }
);

export const getNotification = createSelector(
  getTaskState,
  fromTask.getNotification
);


