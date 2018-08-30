import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import * as fromTask from '@app/modules/document-management/reducers/index.reducer';
import {Observable} from 'rxjs/index';
import {select, Store} from '@ngrx/store';
import * as taskActions from '@app/modules/document-management/actions/task.action';
import {TaskData} from '@app/modules/document-management/model/task-data.model';
@Component({
  selector: 'app-document-portal-header-parent-page',
  templateUrl: './document-portal-header-parent-page.component.html',
  styleUrls: ['./document-portal-header-parent-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class DocumentPortalHeaderParentPageComponent implements OnInit {
  numberOfTasks$: Observable<number>;
  selectedTask$: Observable<TaskData>;
  taskLoadIds$: Observable<string[]>;
  constructor(
    private store: Store<fromTask.State>
  ) {
    this.numberOfTasks$ = this.store.pipe(select(fromTask.getNumberOfTasks));
    this.taskLoadIds$ = this.store.pipe(select(fromTask.getTaskLoadIds));
    this.selectedTask$ = this.store.pipe(select(fromTask.getSelectedTask));
  }

  onTaskUpdate(taskId: string) {
    this.store.dispatch(new taskActions.TaskLoad(taskId));
  }

  ngOnInit() {
  }

}
