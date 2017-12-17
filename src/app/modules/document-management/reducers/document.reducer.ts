import * as documentAction from '@app/modules/document-management/actions/document.action.ts';
import {DocumentData} from '@app/modules/document-management/model/documant-data.model';


export interface State {
  documentListLoading: boolean;
  documentListLoaded: boolean;
  documentDataList: DocumentData[];
  objId: string;
  objCode: string;
  userId: string;
  selectedDocument: DocumentData;
  navIndex: number;
}

const initialState: State = {
  documentListLoading: true,
  documentListLoaded: false,
  documentDataList: null,
  objId: null,
  objCode: null,
  userId: null,
  selectedDocument: null,
  navIndex: 0
};

export function reducer(state = initialState, action: documentAction.Actions): State {
  switch (action.type) {
    case documentAction.DOCUMENT_LIST_LOADING: {
      return {
        ...state,
        documentListLoading: action.payload
      };
    }
    case documentAction.DOCUMENT_LIST_LOADED: {
      return {
        ...state,
        documentListLoaded: true,
        documentDataList: action.payload.documentListData,
        objId: action.payload.objId,
        objCode: action.payload.objCode,
        userId: action.payload.userId
      };
    }
    case documentAction.DOCUMENT_SELECTED: {
      return {
        ...state,
        selectedDocument: action.payload
      };
    }
    case documentAction.NAVIGATION_INDEX_CHANGED: {
      return {
        ...state,
        navIndex: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
export const getDocumentListLoading = (state: State) => state.documentListLoading;
export const getDocumentListLoaded = (state: State) => state.documentListLoaded;
export const getDocumentDataList = (state: State) => state.documentDataList;
export const getNavigationIndex = (state: State) => state.navIndex;
export const getSelectedDocument = (state: State) => state.selectedDocument;
export const getObjectId = (state: State) => state.objId;
export const getUserId = (state: State) => state.userId;


