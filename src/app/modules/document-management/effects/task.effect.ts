import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, toArray, tap } from 'rxjs/operators';
import { DMService } from '@app/core/services/dm.service';
import { PortalService} from '@app/modules/document-management/services/portal.service';
import { Task} from '@app/core/model/workfront/Task.model';

import {
  TaskLoad,
  TaskLoadError,
  TaskLoadSuccess,
  TaskActionTypes,
  TaskListLoadError,
  TaskListLoadSuccess,
  TaskListLoad
} from '@app/modules/document-management/actions/task.action';
import {TaskData} from '@app/modules/document-management/model/task-data.model';

@Injectable()
export class TaskEffects {
  constructor(
    private actions$: Actions,
    private dmService: DMService,
    private portalService: PortalService
  ) {}

  @Effect()
  loadTaskList$: Observable<Action> = this.actions$.pipe(
    ofType<TaskListLoad>(TaskActionTypes.TaskListLoad),
    switchMap(() =>
      this.dmService.getTaskListByUserId(this.portalService.user.ID).pipe(
       // toArray(),
        map((tasks: Task[]) => {
          const taskList: TaskData[] = [];
          for (const t of tasks) {
            const taskData: TaskData = new TaskData();
            taskData.task = t;
            taskData.state = this.portalService.getTaskState(t);
            taskData.lastRefreshed = new Date();
            taskList.push(taskData);
          }
          return new TaskListLoadSuccess(taskList);
        }),
        catchError(error => of(new TaskListLoadError(error)))
      )
    )
  );

  @Effect()
  loadTask$: Observable<Action> = this.actions$.pipe(
    ofType<TaskLoad>(TaskActionTypes.TaskLoad),
    map(action => action.payload),
    mergeMap((taskId) =>
      this.dmService.getTaskByTaskId(taskId).pipe(
        map((tasks: Task[]) => {
          if (tasks.length === 1) {
            const taskData: TaskData = new TaskData();
            taskData.task = tasks[0];
            taskData.state = this.portalService.getTaskState(tasks[0]);
            taskData.lastRefreshed = new Date();
            return new TaskLoadSuccess(taskData);
          }else {
            return new TaskLoadError(taskId);
          }
        }),
        catchError(error => of(new TaskLoadError(error)))
      )
    )
  );

  // @Effect()
  // addBookToCollection$: Observable<Action> = this.actions$.pipe(
  //   ofType<AddBook>(CollectionActionTypes.AddBook),
  //   map(action => action.payload),
  //   mergeMap(book =>
  //     this.db.insert('books', [book]).pipe(
  //       map(() => new AddBookSuccess(book)),
  //       catchError(() => of(new AddBookFail(book)))
  //     )
  //   )
  // );
  //
  // @Effect()
  // removeBookFromCollection$: Observable<Action> = this.actions$.pipe(
  //   ofType<RemoveBook>(CollectionActionTypes.RemoveBook),
  //   map(action => action.payload),
  //   mergeMap(book =>
  //     this.db.executeWrite('books', 'delete', [book.id]).pipe(
  //       map(() => new RemoveBookSuccess(book)),
  //       catchError(() => of(new RemoveBookFail(book)))
  //     )
  //   )
  // );

}
