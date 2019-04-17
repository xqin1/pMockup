
import { SearchProjectActionTypes, SearchProjectActionsUnion} from "../actions/search-project.action";

export interface State {
  projectIds: string[];
  selectionIds: string[];
  accumulateMode: boolean;
  loading: boolean;
  error: string;
  query: string;
}

const initialState: State = {
  projectIds: [],
  selectionIds: [],
  accumulateMode: true,
  loading: false,
  error: '',
  query: '',
};

export function reducer(state = initialState, action: SearchProjectActionsUnion): State {
  switch (action.type) {
    case SearchProjectActionTypes.SearchProject: {
      const query = action.payload;
      if (query === '' || query.length > 6 || isNaN(+query)) {
        if (state.accumulateMode){
          return {
            ...state,
            loading: false,
            error: '',
            query,
          };
        }else{
          return {
            ...state,
            projectIds: [],
            loading: false,
            error: '',
            query,
          };
        }
      }

      if (state.accumulateMode){
        return {
          ...state,
          loading: true,
          error: '',
          query,
        };
      }else{
        return {
          ...state,
          projectIds: [],
          loading: true,
          error: '',
          query,
        };
      }
    }
    case SearchProjectActionTypes.SearchProjectComplete: {
      const myIds: string[] = Object.assign([], action.payload);
      if (state.accumulateMode){
        state.projectIds.forEach(p => {
          if (myIds.indexOf(p) < 0) {
            myIds.push(p);
          }
        });
      }
      return {
        ...state,
        projectIds: myIds,
        loading: false,
        error: '',
        query: '',
      };
    }

    case SearchProjectActionTypes.SearchProjectError: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    case SearchProjectActionTypes.SearchProjectAccumulate: {
      return {
        ...state,
        accumulateMode: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export const getProjectIds = (state: State) => state.projectIds;

export const getProjectQuery = (state: State) => state.query;

export const getProjectLoading = (state: State) => state.loading;

export const getProjectError = (state: State) => state.error;

export const getSelectionsIds = (state: State) => state.selectionIds;

export const getAccumulateMode = (state: State) => state.accumulateMode;
