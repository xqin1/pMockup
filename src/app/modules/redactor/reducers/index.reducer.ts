import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '@app/reducers';
import * as fromTask from './task.reducer';
import * as fromSearchAppNum from './search-appnum.reducer';
import * as fromSearchProject from './search-project.reducer';
import { Task} from '@app/core/model/workfront/Task.model';

export interface RedactorState {
  task: fromTask.State;
  searchAppNum: fromSearchAppNum.State;
  searchProject: fromSearchProject.State;
}

export interface State extends fromRoot.State {
  redactor: RedactorState;
}

export const reducers = {
  task: fromTask.reducer,
  searchAppNum: fromSearchAppNum.reducer,
  searchProject: fromSearchProject.reducer
};

export const getRedactorState = createFeatureSelector<State, RedactorState>('redactor');

// TASK STATE
export const getTaskState = createSelector(
  getRedactorState,
  state => state.task
);

export const getTaskNotification = createSelector(
  getTaskState,
  fromTask.getNotification
);
export const getTaskDataLoading = createSelector(
  getTaskState,
  fromTask.getTaskDataLoading
);
export const getTaskDataLoaded = createSelector(
  getTaskState,
  fromTask.getTaskDataLoaded
);
export const getTaskData = createSelector(
  getTaskState,
  fromTask.getTaskData
);
export const getTaskName = createSelector(
  getTaskData,
  (taskData: Task) => taskData.name
);
export const getTaskId = createSelector(
  getTaskData,
  (taskData: Task) => taskData.ID
);
export const getProjectName = createSelector(
  getTaskData,
  (taskData: Task) => taskData.project.name
);

// SEARCH App Number STATE
export const getSearchAppNumState = createSelector(
  getRedactorState,
  (state: RedactorState) => state.searchAppNum
);

export const getSearchAppNumber = createSelector(
  getSearchAppNumState,
  fromSearchAppNum.getAppNumber
);
export const getSearchAppNumQuery = createSelector(
  getSearchAppNumState,
  fromSearchAppNum.getAppNumQuery
);
export const getSearchAppNumLoading = createSelector(
  getSearchAppNumState,
  fromSearchAppNum.getAppNumLoading
);
export const getSearchAppNumError = createSelector(
  getSearchAppNumState,
  fromSearchAppNum.getAppNumError
);

// SEARCH PROJECT STATE
export const getSearchProjectState = createSelector(
  getRedactorState,
  (state: RedactorState) => state.searchProject
);

export const getSearchProjectIds = createSelector(
  getSearchProjectState,
  fromSearchProject.getProjectIds
);
export const getSearchProjectQuery = createSelector(
  getSearchProjectState,
  fromSearchProject.getProjectQuery
);
export const getSearchProjectLoading = createSelector(
  getSearchProjectState,
  fromSearchProject.getProjectLoading
);
export const getSearchProjectError = createSelector(
  getSearchProjectState,
  fromSearchProject.getProjectError
);
export const getSelectionProjectIds = createSelector(
  getSearchProjectState,
  fromSearchProject.getSelectionsIds
);

export const getAccumulateMode = createSelector(
  getSearchProjectState,
  fromSearchProject.getAccumulateMode
);

export const getProjectNotification = createSelector(
  getSearchProjectState,
  fromSearchProject.getProjectNotification
);




