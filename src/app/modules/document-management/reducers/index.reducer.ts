import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '@app/reducers';
import * as fromDocument from './document.reducer';


export interface DocumentManagementState {
  document: fromDocument.State;

}

export interface State extends fromRoot.State {
  documentManagement: DocumentManagementState;
}

export const reducers = {
  document: fromDocument.reducer
};

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `books` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 * 	constructor(state$: Observable<State>) {
 * 	  this.booksState$ = state$.select(getBooksState);
 * 	}
 * }
 * ```
 */

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
*/
export const getDocumentManagementState = createFeatureSelector<DocumentManagementState>('documentManagement');

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
export const getDocumentState = createSelector(
  getDocumentManagementState,
  state => state.document
);

// selectors for data
export const getDocumentListLoaded = createSelector(
  getDocumentState,
  fromDocument.getDocumentListLoaded
);
export const getDocumentListLoading = createSelector(
  getDocumentState,
  fromDocument.getDocumentListLoading
);
export const getDocumentDataList = createSelector(
  getDocumentState,
  fromDocument.getDocumentDataList
);
export const getDocumentRegulatoryActionList = createSelector(
  getDocumentState,
  fromDocument.getDocumentRegulatoryActionList
);
export const getNavigationIndex = createSelector(
  getDocumentState,
  fromDocument.getNavigationIndex
);
export const getSelectedDocument = createSelector(
  getDocumentState,
  fromDocument.getSelectedDocument
);
export const getSelectedDocumentID = createSelector(
  getDocumentState,
  fromDocument.getSelectedDocumentID
);
export const getObjectId = createSelector(
  getDocumentState,
  fromDocument.getObjectId
);
export const getUserId = createSelector(
  getDocumentState,
  fromDocument.getUserId
);
