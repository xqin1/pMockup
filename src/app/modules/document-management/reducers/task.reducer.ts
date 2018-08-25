import { TaskActionTypes, TaskActionsUnion} from '@app/modules/document-management/actions/task.action';
import {TaskData} from '@app/modules/document-management/model/task-data.model';

export interface State {
  taskListLoaded: boolean;
  taskListLoading: boolean;
  taskList: TaskData[];
  selectedTaskId: string;
  documentBuildIds: string[];
}

const initialState: State = {
  taskListLoaded: false,
  taskListLoading: false,
  taskList: [],
  selectedTaskId: null,
  documentBuildIds: []
};

export function reducer(
  state = initialState,
  action: TaskActionsUnion
): State {
  switch (action.type) {
    case TaskActionTypes.TaskListLoad: {
      return {
        ...state,
        taskListLoading: true
      };
    }

    case TaskActionTypes.TaskListLoadSuccess: {
      return {
        taskListLoaded: true,
        taskListLoading: false,
        taskList: action.payload,
        selectedTaskId: action.payload[0].task["ID"],
        documentBuildIds: []
      };
    }

    case TaskActionTypes.TaskSelected: {
        return {
          ...state,
          selectedTaskId: action.payload.task.ID
        };
    }

    case TaskActionTypes.DocumentBuild: {
        const ids = [].concat(state.documentBuildIds);
        if (!ids.includes(action.payload)) {
          ids.push(action.payload);
        }
        return {
          ...state,
          documentBuildIds: ids
        };
    }

    // case CollectionActionTypes.AddBookSuccess:
    // case CollectionActionTypes.RemoveBookFail: {
    //   if (state.ids.indexOf(action.payload.id) > -1) {
    //     return state;
    //   }
    //
    //   return {
    //     ...state,
    //     ids: [...state.ids, action.payload.id],
    //   };
    // }
    //
    // case CollectionActionTypes.RemoveBookSuccess:
    // case CollectionActionTypes.AddBookFail: {
    //   return {
    //     ...state,
    //     ids: state.ids.filter(id => id !== action.payload.id),
    //   };
    // }

    default: {
      return state;
    }
  }
}

export const getTaskListLoaded = (state: State) => state.taskListLoaded;

export const getTAskListLoading = (state: State) => state.taskListLoading;

export const getTaskList = (state: State) => state.taskList;

export const getSelectedTaskId = (state: State) => state.selectedTaskId;

export const getDocumentBuildIds = (state: State) => state.documentBuildIds;
