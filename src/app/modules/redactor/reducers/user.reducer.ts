import {User} from '@app/core/model/workfront/User.model';
import {UserActionTypes, UserActionsUnion} from '@app/modules/redactor/actions/user.action';


export interface State {
  userDataLoaded: boolean;
  userDataLoading: boolean;
  userData: User;
}

const initialState: State = {
  userDataLoaded: false,
  userDataLoading: false,
  userData: new User()
};

export function reducer(
  state = initialState,
  action: UserActionsUnion
): State {
  switch (action.type) {
    case UserActionTypes.UserDataLoad: {
      return {
        ...state,
        userDataLoading: true
      };
    }
    case UserActionTypes.UserDataLoadSuccess: {
      return {
        userDataLoaded: true,
        userDataLoading: false,
        userData: action.payload
      };
    }
    case UserActionTypes.UserDataLoadError: {
      return {
        ...state,
        userDataLoaded: false,
        userDataLoading: false,
      };
    }
    default: {
      return state;
    }
  }
}

export const getUserDataLoaded = (state: State) => state.userDataLoaded;
export const getUserDataLoading = (state: State) => state.userDataLoading;
export const getUserData = (state: State) => state.userData;



