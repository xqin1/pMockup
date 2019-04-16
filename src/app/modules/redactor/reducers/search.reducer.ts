
import { SearchActionTypes, SearchActionsUnion} from "../actions/search.action";

export interface State {
  appNumber: number[];
  loading: boolean;
  error: string;
  query: string;
}

const initialState: State = {
  appNumber: [],
  loading: false,
  error: '',
  query: '',
};

export function reducer(state = initialState, action: SearchActionsUnion): State {
  switch (action.type) {
    case SearchActionTypes.Search: {
      const query = action.payload;
      if (query === '') {
        return {
          appNumber: [],
          loading: false,
          error: '',
          query,
        };
      }

      return {
        appNumber:[],
        loading: true,
        error: '',
        query,
      };
    }

    case SearchActionTypes.SearchComplete: {
      return {
        appNumber: action.payload,
        loading: false,
        error: '',
        query: state.query,
      };
    }

    case SearchActionTypes.SearchError: {
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

export const getAppNumber = (state: State) => state.appNumber;

export const getQuery = (state: State) => state.query;

export const getLoading = (state: State) => state.loading;

export const getError = (state: State) => state.error;
