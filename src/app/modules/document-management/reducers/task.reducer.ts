import { TaskActionTypes, TaskActionsUnion} from '@app/modules/document-management/actions/task.action';
import {TaskData} from '@app/modules/document-management/model/task-data.model';

export interface State {
  taskListLoaded: boolean;
  taskListLoading: boolean;
  taskList: TaskData[];
  selectedTaskId: string;
  taskLoadingIds: string[];
  selectedDocumentId: string;
}

const initialState: State = {
  taskListLoaded: false,
  taskListLoading: false,
  taskList: [],
  selectedTaskId: null,
  taskLoadingIds: [],
  selectedDocumentId: null
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
      let selectedTaskId = state.selectedTaskId;
      let selectedDocumentId = state.selectedDocumentId;
      if (state.selectedTaskId === null) {
        selectedTaskId = action.payload[0].task.ID;
        if (action.payload[0].task.documents.length === 1) {
          selectedDocumentId = action.payload[0].task.documents[0].ID;
        }
      }
      return {
        taskListLoaded: true,
        taskListLoading: false,
        taskList: action.payload,
        selectedTaskId: selectedTaskId,
        taskLoadingIds: [],
        selectedDocumentId: selectedDocumentId
      };
    }
    case TaskActionTypes.TaskSelected: {
      let selectedDocumentId = null;
      if (action.payload.task.documents.length === 1) {
        selectedDocumentId = action.payload.task.documents[0].ID;
      }
      return {
        ...state,
        selectedTaskId: action.payload.task.ID,
        selectedDocumentId: selectedDocumentId
      };
    }
    case TaskActionTypes.DocumentSelected: {
      return {
        ...state,
        selectedDocumentId: action.payload
      };
    }
    case TaskActionTypes.TaskLoad: {
      const ids = [].concat((state.taskLoadingIds));
      if (!ids.includes(action.payload)) {
        ids.push(action.payload);
      }
      return {
        ...state,
        taskLoadingIds: ids
      };
    }
    case TaskActionTypes.TaskLoadSuccess: {
      const ids = [].concat((state.taskLoadingIds));
      const newTaskList = [].concat((state.taskList));
      newTaskList.forEach((item, index) => {
        if (item.task.ID === action.payload.task.ID) {
          newTaskList[index] = action.payload;
        }
      });
      return {
        ...state,
        taskList: newTaskList,
        taskLoadingIds: ids.filter(id => id !== action.payload.task.ID)

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

export const getTaskListLoading = (state: State) => state.taskListLoading;

export const getTaskList = (state: State) => state.taskList;

export const getNumberOfTasks = (state: State) => state.taskList.length;

export const getSelectedTaskId = (state: State) => state.selectedTaskId;

export const getTaskLoadIds = (state: State) => state.taskLoadingIds;

export const getSelectedDocumentId = (state: State) => state.selectedDocumentId;



