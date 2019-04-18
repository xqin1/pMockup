
import { SearchAppNumActionTypes, SearchAppNumActionsUnion} from "../actions/search-appnum.action";

export interface State {
  appNumber: number[];
  appNumLoading: boolean;
  appNumError: string;
  appNumQuery: string;
}

const initialState: State = {
  appNumber: [],
  appNumLoading: false,
  appNumError: '',
  appNumQuery: '',
};

export function reducer(state = initialState, action: SearchAppNumActionsUnion): State {
  switch (action.type) {
    case SearchAppNumActionTypes.SearchAppNum: {
      const query = action.payload;
      if (query === '') {
        return {
          appNumber: [],
          appNumLoading: false,
          appNumError: '',
          appNumQuery: ''
        };
      }

      return {
        appNumber: [],
        appNumLoading: true,
        appNumError: '',
        appNumQuery: query
      };
    }

    case SearchAppNumActionTypes.SearchAppNumComplete: {
      return {
        ...state,
        appNumber: action.payload,
        appNumLoading: false
      };
    }

    case SearchAppNumActionTypes.SearchAppNumError: {
      return {
        ...state,
        appNumber: [],
        appNumLoading: false,
        appNumError: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export const getAppNumber = (state: State) => state.appNumber;

export const getAppNumQuery = (state: State) => state.appNumQuery;

export const getAppNumLoading = (state: State) => state.appNumLoading;

export const getAppNumError = (state: State) => state.appNumError;
