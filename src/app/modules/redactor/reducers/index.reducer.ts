import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '@app/reducers';
import * as fromData from './data.reducer';
import { Task} from '@app/core/model/workfront/Task.model';

export interface RedactorState {
  data: fromData.State;
}

export interface State extends fromRoot.State {
  redactor: RedactorState;
}

export const reducers = {
  data: fromData.reducer
};

export const getRedactorState = createFeatureSelector<State, RedactorState>('redactor');

export const getDataState = createSelector(
  getRedactorState,
  state => state.data
);

export const getNotification = createSelector(
  getDataState,
  fromData.getNotification
);
export const getTaskDataLoading = createSelector(
  getDataState,
  fromData.getTaskDataLoading
);
export const getTaskDataLoaded = createSelector(
  getDataState,
  fromData.getTaskDataLoaded
);
export const getTaskData = createSelector(
  getDataState,
  fromData.getTaskData
);
export const getTaskName = createSelector(
  getTaskData,
  (taskData: Task) => taskData.name
);
export const getProjectName = createSelector(
  getTaskData,
  (taskData: Task) => taskData.project.name
);



