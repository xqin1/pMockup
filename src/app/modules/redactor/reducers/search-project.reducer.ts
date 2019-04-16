
import { SearchProjectActionTypes, SearchProjectActionsUnion} from "../actions/search-project.action";
import {Project} from '@app/core/model/workfront/Project.model';

export interface State {
  projects: Project[];
  loading: boolean;
  error: string;
  query: string;
}

const initialState: State = {
  projects: [],
  loading: false,
  error: '',
  query: '',
};

export function reducer(state = initialState, action: SearchProjectActionsUnion): State {
  switch (action.type) {
    case SearchProjectActionTypes.SearchProject: {
      const query = action.payload;
      if (query === '' || query.length > 6 || isNaN(+query)) {
        return {
          projects: [],
          loading: false,
          error: '',
          query,
        };
      }

      return {
        projects: [],
        loading: true,
        error: '',
        query,
      };
    }

    case SearchProjectActionTypes.SearchProjectComplete: {
      return {
        projects: action.payload,
        loading: false,
        error: '',
        query: state.query,
      };
    }

    case SearchProjectActionTypes.SearchProjectError: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export const getProjects = (state: State) => state.projects;

export const getProjectQuery = (state: State) => state.query;

export const getProjectLoading = (state: State) => state.loading;

export const getProjectError = (state: State) => state.error;
