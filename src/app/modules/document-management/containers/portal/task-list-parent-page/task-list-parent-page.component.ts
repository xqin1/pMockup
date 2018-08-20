import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from '@app/core/model/workfront/Task.model';
import * as fromTask from '@app/modules/document-management/reducers/index.reducer';
import * as taskActions from '@app/modules/document-management/actions/task.action';

@Component({
  selector: 'app-task-list-parent-page',
  templateUrl: './task-list-parent-page.component.html',
  styleUrls: ['./task-list-parent-page.component.css']
})
export class TaskListParentPageComponent implements OnInit {
  taskList$: Observable<Task[]>;
  selectedTaskId: Observable<string>;
  selectedTask: Observable<Task>;
  constructor(
    private store: Store<fromTask.State>
  ) {
    this.taskList$ = this.store.pipe(select(fromTask.getTaskList));
    this.selectedTaskId = this.store.pipe(select(fromTask.getSelectedTaskId));
    this.selectedTask = this.store.pipe(select(fromTask.getSelectedTask));
  }

  onTaskSelected(task: Task){
    this.store.dispatch(new taskActions.TaskSelected(task));
  }
  ngOnInit() {
  }

}
