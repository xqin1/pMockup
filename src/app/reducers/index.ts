import {
  ActionReducerMap,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromRouter from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';

// import * as fromLayout from '@app/core/reducers/layout.reducer';

export interface State {
  // layout: fromLayout.State;
  router: fromRouter.RouterReducerState;
}

export const reducers: ActionReducerMap<State> = {
  // layout: fromLayout.reducer,
  router: fromRouter.routerReducer,
};

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger, storeFreeze]
  : [];

/**
 * Layout Reducers
 */
// export const getLayoutState = createFeatureSelector<fromLayout.State>('layout');
//
// export const getDataLoading = createSelector(
//   getLayoutState
//   // fromLayout.getDataLoading
// );
// export const getDataLoaded = createSelector(
//   getLayoutState,
//   fromLayout.getDataLoaded
// );
