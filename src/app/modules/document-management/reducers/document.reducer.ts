import * as documentAction from '@app/modules/document-management/actions/document.action.ts';
import {DocumentData} from '@app/modules/document-management/model/documant-data.model';
import {DocumentRegulatoryActionPayload} from '@app/modules/document-management/model/document-regulatory-action-paylaod.model';


export interface State {
  documentListLoading: boolean;
  documentListLoaded: boolean;
  documentDataList: DocumentData[];
  documentRegulatoryActionList: DocumentRegulatoryActionPayload[];
  selectedDocumentID: string;
}

const initialState: State = {
  documentListLoading: true,
  documentListLoaded: false,
  documentDataList: null,
  documentRegulatoryActionList: [],
  selectedDocumentID: null,
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
      };
    }
    case documentAction.DOCUMENT_SELECTED: {
      return {
        ...state,
        selectedDocumentID: action.payload
      };
    }

    case documentAction.DOCUMENT_REGULATORY_ACTION_UPDATED: {
        const newDocumentRegulatoryActionList = [].concat(state.documentRegulatoryActionList);
        newDocumentRegulatoryActionList.push(action.payload);
        return {
          ...state,
          documentRegulatoryActionList: newDocumentRegulatoryActionList
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
export const getDocumentRegulatoryActionList = (state: State) => state.documentRegulatoryActionList;
export const getSelectedDocumentID = (state: State) => state.selectedDocumentID;
export const getSelectedDocument = (state: State) => {
  return state.documentDataList.filter((d) => {
     return d.documentID === state.selectedDocumentID;
  })[0];
};
export const getSelectedRegulatoryAction = (state: State) => {
  return state.documentRegulatoryActionList.filter((d) => {
    return d.documentID === state.selectedDocumentID;
  })[0];
};


