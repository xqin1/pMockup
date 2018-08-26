import { Component, OnInit } from '@angular/core';
import { TaskData} from '@app/modules/document-management/model/task-data.model';
import * as fromTask from '@app/modules/document-management/reducers/index.reducer';
import {Observable} from 'rxjs/index';
import {select, Store} from '@ngrx/store';
import * as taskActions from '@app/modules/document-management/actions/task.action';

@Component({
  selector: 'app-task-detail-parent-page',
  templateUrl: './task-detail-parent-page.component.html',
  styleUrls: ['./task-detail-parent-page.component.css']
})
export class TaskDetailParentPageComponent implements OnInit {
  selectedTask$: Observable<TaskData>;
  taskLoadIds$: Observable<string[]>;
  constructor(
    private store: Store<fromTask.State>
  ) {
    this.selectedTask$ = this.store.pipe(select(fromTask.getSelectedTask));
    this.taskLoadIds$ = this.store.pipe(select(fromTask.getTaskLoadIds));
  }

  onTaskUpdate(taskId: string) {
    this.store.dispatch(new taskActions.TaskLoad(taskId));
  }
  ngOnInit() {
  }

}
