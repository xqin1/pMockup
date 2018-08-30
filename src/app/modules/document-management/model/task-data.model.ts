import {Task} from '@app/core/model/workfront/Task.model';
import {TaskState} from '@app/modules/document-management/model/task-state.enum';

export class TaskData {
  task: Task;
  state: TaskState;
  lastRefreshed: Date;
};
