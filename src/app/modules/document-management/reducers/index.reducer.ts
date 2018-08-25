import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '@app/reducers';
import * as fromDocument from './document.reducer';
import * as fromTask from './task.reducer';


export interface DocumentManagementState {
  document: fromDocument.State;
  task: fromTask.State;

}

export interface State extends fromRoot.State {
  documentManagement: DocumentManagementState;
}

export const reducers = {
  document: fromDocument.reducer,
  task: fromTask.reducer
};

export const getDocumentManagementState = createFeatureSelector<State, DocumentManagementState>('documentManagement');

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */

// for document state
export const getDocumentState = createSelector(
  getDocumentManagementState,
  state => state.document
);

export const getDocumentListLoaded = createSelector(
  getDocumentState,
  fromDocument.getDocumentListLoaded
);
export const getDocumentListLoading = createSelector(
  getDocumentState,
  fromDocument.getDocumentListLoading
);
export const getDocumentDataList = createSelector(
  getDocumentState,
  fromDocument.getDocumentDataList
);
export const getSelectedDocument = createSelector(
  getDocumentState,
  fromDocument.getSelectedDocument
);
export const getSelectedDocumentID = createSelector(
  getDocumentState,
  fromDocument.getSelectedDocumentID
);
export const getRegulatoryLoadingStatus = createSelector(
  getDocumentState,
  fromDocument.getRegulaotryLoadingStatus
);

// for task state
export const getTaskState = createSelector(
  getDocumentManagementState,
  state => state.task
);

export const getTaskListLoading = createSelector(
  getTaskState,
  fromTask.getTAskListLoading
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

export const getDocumentBuildIds = createSelector(
  getTaskState,
  fromTask.getDocumentBuildIds
);

export const getTaskLoadIds = createSelector(
  getTaskState,
  fromTask.getTaskLoadIds
);


