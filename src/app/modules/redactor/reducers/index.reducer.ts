import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '@app/reducers';
import * as fromData from './data.reducer';
import * as fromSearch from './search.reducer';
import * as fromSearchProject from './search-project.reducer';
import { Task} from '@app/core/model/workfront/Task.model';

export interface RedactorState {
  data: fromData.State;
  search: fromSearch.State;
  searchProject: fromSearchProject.State;
}

export interface State extends fromRoot.State {
  redactor: RedactorState;
}

export const reducers = {
  data: fromData.reducer,
  search: fromSearch.reducer,
  searchProject: fromSearchProject.reducer
};

export const getRedactorState = createFeatureSelector<State, RedactorState>('redactor');

// DATA STATE
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

// SEARCH App Number STATE
export const getSearchState = createSelector(
  getRedactorState,
  (state: RedactorState) => state.search
);

export const getSearchAppNumber = createSelector(
  getSearchState,
  fromSearch.getAppNumber
);
export const getSearchQuery = createSelector(
  getSearchState,
  fromSearch.getQuery
);
export const getSearchLoading = createSelector(
  getSearchState,
  fromSearch.getLoading
);
export const getSearchError = createSelector(
  getSearchState,
  fromSearch.getError
);

// SEARCH PROJECT STATE
export const getSearchProjectState = createSelector(
  getRedactorState,
  (state: RedactorState) => state.searchProject
);

export const getSearchProjects = createSelector(
  getSearchProjectState,
  fromSearchProject.getProjects
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



