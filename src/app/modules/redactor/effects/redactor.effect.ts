import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, toArray, tap } from 'rxjs/operators';
import { DMService } from '@app/core/services/dm.service';
import { RedactorService} from '@app/modules/redactor/services/redactor.service';
import { Task} from '@app/core/model/workfront/Task.model';

import {
  TaskDataLoad,
  TaskDataLoadError,
  TaskDataLoadSuccess,
  DataActionTypes
} from '@app/modules/redactor/actions/data.action';



@Injectable()
export class RedactorEffects {
  constructor(
    private actions$: Actions,
    private dmService: DMService,
    private redactorService: RedactorService
  ) {}


  @Effect()
  loadTask$: Observable<Action> = this.actions$.pipe(
    ofType<TaskDataLoad>(DataActionTypes.TaskDataLoad),
    map(action => action.payload),
    mergeMap((taskId) =>
      this.dmService.getRedactorTaskByTaskId(taskId).pipe(
        map((task: Task) => {
          if (task != null) {
            this.redactorService.setCurrentTask(task);
            return new TaskDataLoadSuccess(task);
          }else {
            return new TaskDataLoadError(taskId);
          }
        }),
        catchError(error => of(new TaskDataLoadError(error)))
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
