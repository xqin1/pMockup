import * as authAction from '../actions/auth.action';

export interface State {
  loggedIn: boolean;
}

export const initialState: State = {
  loggedIn: false
};

export function reducer(state = initialState, action: authAction.AuthActions): State {
  switch (action.type) {
    case authAction.LOGIN_SUCCESS: {
      return {
        ...state,
        loggedIn: true
      };
    }

    case authAction.LOGOUT: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getLoggedIn = (state: State) => state.loggedIn;
