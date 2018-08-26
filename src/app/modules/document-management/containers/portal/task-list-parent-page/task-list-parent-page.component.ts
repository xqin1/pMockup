import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TaskData} from '@app/modules/document-management/model/task-data.model';
import * as fromTask from '@app/modules/document-management/reducers/index.reducer';
import * as taskActions from '@app/modules/document-management/actions/task.action';

@Component({
  selector: 'app-task-list-parent-page',
  templateUrl: './task-list-parent-page.component.html',
  styleUrls: ['./task-list-parent-page.component.css']
})
export class TaskListParentPageComponent implements OnInit {
  taskList$: Observable<TaskData[]>;
  taskListLoading$: Observable<boolean>;
  selectedTaskId: Observable<string>;
  selectedTask: Observable<TaskData>;
  constructor(
    private store: Store<fromTask.State>
  ) {
    this.taskList$ = this.store.pipe(select(fromTask.getTaskList));
    this.taskListLoading$ = this.store.pipe(select(fromTask.getTaskListLoading));
    this.selectedTaskId = this.store.pipe(select(fromTask.getSelectedTaskId));
    this.selectedTask = this.store.pipe(select(fromTask.getSelectedTask));
  }

  onTaskSelected(task: TaskData){
    this.store.dispatch(new taskActions.TaskSelected(task));
  }

  onUpdateTaskList() {
    this.store.dispatch(new taskActions.TaskListLoad());
  }
  ngOnInit() {
  }

}
