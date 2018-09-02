import { Component, OnInit } from '@angular/core';
import { TaskData} from '@app/modules/document-management/model/task-data.model';
import * as fromTask from '@app/modules/document-management/reducers/index.reducer';
import * as taskActions from '@app/modules/document-management/actions/task.action';
import {Observable} from 'rxjs/index';
import {select, Store} from '@ngrx/store';
import { Document} from '@app/core/model/workfront/Document.model';

@Component({
  selector: 'app-task-state-parent-page',
  templateUrl: './task-state-parent-page.component.html',
  styleUrls: ['./task-state-parent-page.component.css']
})
export class TaskStateParentPageComponent implements OnInit {
  selectedTaskId: Observable<string>;
  selectedTask: Observable<TaskData>;
  documentBuildIds: Observable<string[]>;
  selectedDocument: Observable<Document>;
  constructor(
    private store: Store<fromTask.State>
  ) {
    this.selectedTaskId = this.store.pipe(select(fromTask.getSelectedTaskId));
    this.selectedTask = this.store.pipe(select(fromTask.getSelectedTask));
    this.selectedDocument = this.store.pipe(select(fromTask.getActiveDocument));
  }

  onDocumentBuildFinish(taskId: string) {
    this.store.dispatch(new taskActions.TaskLoad(taskId));
  }

  ngOnInit() {
  }

}
