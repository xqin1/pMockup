import * as documentAction from '@app/modules/document-management/actions/document.action.ts';


export interface State {
  documentListLoading: boolean;
  documentListLoaded: boolean;
}

const initialState: State = {
  documentListLoading: true,
  documentListLoaded: false
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
        documentListLoaded: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
export const getDocumentListLoading = (state: State) => state.documentListLoading;
export const getDocumentListLoaded = (state: State) => state.documentListLoaded;


