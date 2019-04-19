
import { SearchProjectActionTypes, SearchProjectActionsUnion} from "../actions/search-project.action";
import {Notification} from '@app/modules/redactor/models/notification.model';
import {CONFIG} from '@app/modules/redactor/config';

export interface State {
  projectIds: string[];
  selectionIds: string[];
  accumulateMode: boolean;
  loading: boolean;
  error: string;
  query: string;
  notification: Notification;
  projectUpdating: boolean;
  projectUpdateComplete: boolean;
  projectUpdateError: string;

  templateAttaching: boolean;
  templateAttachComplete: boolean;
  templateAttachAllComplete: boolean;
  templateAttachError: string;
  projectTemplateAttached: string[];
}

const initialState: State = {
  projectIds: [],
  selectionIds: [],
  accumulateMode: true,
  loading: false,
  error: '',
  query: '',
  notification: new Notification(),
  projectUpdating: false,
  projectUpdateComplete: false,
  projectUpdateError: '',
  templateAttaching: false,
  templateAttachComplete: false,
  templateAttachError: '',
  templateAttachAllComplete: false,
  projectTemplateAttached: []
};

export function reducer(state = initialState, action: SearchProjectActionsUnion): State {
  switch (action.type) {
    case SearchProjectActionTypes.SearchProject: {
      const myQuery = action.payload;
      if (myQuery === '' || myQuery.length > 6 || isNaN(+myQuery)) {
        if (state.accumulateMode){
          return {
            ...state,
            loading: false,
            error: '',
            query: '',
          };
        }else{
          return {
            ...state,
            projectIds: [],
            loading: false,
            error: '',
            query: ''
          };
        }
      }

      const noti = new Notification();
      noti.display = true;
      noti.duration = CONFIG.notificationDuration;
      noti.message = 'Searching projects...';
      if (state.accumulateMode){
        return {
          ...state,
          loading: true,
          error: '',
          query: myQuery,
          notification: noti
        };
      }else{
        return {
          ...state,
          projectIds: [],
          loading: true,
          error: '',
          query: myQuery,
          notification: noti
        };
      }
    }
    case SearchProjectActionTypes.SearchProjectComplete: {
      let myIds: string[] = [];
      if (state.accumulateMode){
       myIds = Object.assign([], state.projectIds);
        action.payload.forEach(p => {
          if (myIds.indexOf(p) < 0 && state.selectionIds.indexOf(p) < 0) {
            myIds.push(p);
          }
        });
      }else{
        action.payload.forEach(p => {
          if (state.selectionIds.indexOf(p) < 0) {
            myIds.push(p);
          }
        });
      }
      const noti = new Notification();
      noti.display = true;
      noti.duration = CONFIG.notificationDuration;
      noti.message = `Finish searching projects...${action.payload.length} projects found`;
      return {
        ...state,
        projectIds: myIds,
        loading: false,
        error: '',
        query: '',
        notification: noti
      };
    }

    case SearchProjectActionTypes.SearchProjectError: {
      const noti = new Notification();
      noti.display = true;
      noti.duration = CONFIG.notificationDuration;
      noti.message = 'Searching projects failed...';
      return {
        ...state,
        loading: false,
        error: action.payload,
        notification: noti
      };
    }

    case SearchProjectActionTypes.SearchProjectAccumulate: {
      return {
        ...state,
        accumulateMode: action.payload,
      };
    }

    case SearchProjectActionTypes.SelectProject: {
        const myProjectIds = [];
        const mySelectionIds = Object.assign([], state.selectionIds);
        state.projectIds.forEach(p => {
          if (action.payload.indexOf(p) < 0) {
            myProjectIds.push(p);
          }
        });
      action.payload.forEach(p => {
        if (state.selectionIds.indexOf(p) < 0) {
          mySelectionIds.push(p);
        }
      });

      return {
        ...state,
        projectIds: myProjectIds,
        selectionIds: mySelectionIds
      };
    }

    case SearchProjectActionTypes.RemoveSelecttedProject: {
      const myProjectIds = [];
      const mySelectionIds = [];
      state.selectionIds.forEach(p => {
        if (action.payload !== p) {
          mySelectionIds.push(p);
        }
      });
      if (state.projectIds.length > 0) {
        state.projectIds.forEach(p => {
          if (action.payload !== p) {
            myProjectIds.push(p);
          }
        });
      }else{
        myProjectIds.push(action.payload);
      }


      return {
        ...state,
        projectIds: myProjectIds,
        selectionIds: mySelectionIds
      };
    }





    case SearchProjectActionTypes.UpdateProject: {
        return {
          ...state,
          projectUpdating: true,
          projectUpdateComplete: false,
          projectUpdateError: ''
        };
    }

    case SearchProjectActionTypes.UpdateProjectComplete: {
      return {
        ...state,
        projectIds: [],
        selectionIds: [],
        projectUpdating: false,
        projectUpdateComplete: true,
        projectUpdateError: ''
      };
    }

    case SearchProjectActionTypes.UpdateProjectError: {
      return {
        ...state,
        projectUpdating: false,
        projectUpdateComplete: true,
        projectUpdateError: action.payload
      };
    }

    case SearchProjectActionTypes.AttachTemplate: {
      return {
        ...state,
        templateAttaching: true,
        templateAttachComplete: false,
        templateAttachError: ''
      };
    }

    case SearchProjectActionTypes.AttachTemplateComplete: {
      const myProjectAttachedTemplate = Object.assign([], state.projectTemplateAttached);
      myProjectAttachedTemplate.push(action.payload);
      return {
        ...state,
        templateAttaching: false,
        templateAttachComplete: true,
        templateAttachError: '',
        projectTemplateAttached: myProjectAttachedTemplate
      };
    }

    case SearchProjectActionTypes.AttachTemplateError: {
      return {
        ...state,
        templateAttaching: false,
        templateAttachComplete: true,
        templateAttachError: action.payload
      };
    }

    case SearchProjectActionTypes.AttachAllTemplateComplete: {
      return {
        ...state,
        templateAttaching: false,
        templateAttachComplete: false,
        templateAttachError: '',
        templateAttachAllComplete: true
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
export const getProjectNotification = (state: State) => state.notification;
export const getProjectUpdating = (state: State) => state.projectUpdating;
export const getProjectUpdateComplete = (state: State) => state.projectUpdateComplete;
export const getProjectUpdateError = (state: State) => state.projectUpdateError;
export const getTemplateAttaching = (state: State) => state.templateAttaching;
export const getTemplateError = (state: State) => state.templateAttachError;
export const getTemplateAttachComplete = (state: State) => state.templateAttachComplete;
export const getTemplateAttachAllComplete = (state: State) => state.templateAttachAllComplete;
export const getProjectTemplateAttached = (state: State) => state.projectTemplateAttached;



