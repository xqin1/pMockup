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

@Injectable()
export class TaskEffects {
  constructor(
    private actions$: Actions,
    private dmService: DMService,
    private portalService: PortalService
  ) {}

  @Effect()
  loadTaskList$: Observable<Action> = this.actions$.pipe(
    ofType(TaskActionTypes.TaskListLoad),
    switchMap(() =>
      this.dmService.getTaskListByUserId(this.portalService.user.ID).pipe(
       // toArray(),
        map((tasks: Task[]) => new TaskListLoadSuccess(tasks)),
        catchError(error => of(new TaskListLoadError(error)))
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
