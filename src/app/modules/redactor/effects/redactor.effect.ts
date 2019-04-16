import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {asyncScheduler, Observable, of} from 'rxjs';
import { catchError, map, mergeMap, switchMap, toArray, tap, debounceTime, skip, takeUntil } from 'rxjs/operators';
import { DMService } from '@app/core/services/dm.service';
import { RedactorService} from '@app/modules/redactor/services/redactor.service';
import { Task} from '@app/core/model/workfront/Task.model';

import {TaskDataLoad, TaskDataLoadError, TaskDataLoadSuccess, DataActionTypes} from '@app/modules/redactor/actions/data.action';

import { Search, SearchComplete, SearchError, SearchActionTypes} from '@app/modules/redactor/actions/search.action';
import { SearchProject, SearchProjectComplete, SearchProjectError, SearchProjectActionTypes} from '@app/modules/redactor/actions/search-project.action';
import {EMPTY} from 'rxjs/internal/observable/empty';
import {Project} from '@app/core/model/workfront/Project.model';


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

  @Effect()
  searchAppNumber$ = ({ debounce = 300, scheduler = asyncScheduler } = {}): Observable<Action> => this.actions$.pipe(
      ofType<Search>(SearchActionTypes.Search),
      debounceTime(debounce, scheduler),
      map(action => action.payload),
      switchMap(query => {
        if (query === '') {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(SearchActionTypes.Search),
          skip(1)
        );

        return this.dmService.getApplicationNumber("ANDA", query, 5).pipe(
          takeUntil(nextSearch$),
          map((appNumber: number[]) => new SearchComplete(appNumber)),
          catchError(err => of(new SearchError(err)))
        );
      })
  );

  @Effect()
  searchProject$: Observable<Action> = this.actions$.pipe(
    ofType<SearchProject>(SearchProjectActionTypes.SearchProject),
    map(action => action.payload),
    mergeMap((appNumber) =>
      this.dmService.getPostApprovalProjects("ANDA", appNumber).pipe(
        map((projects: Project[]) => {
          if (projects != null) {

            return new SearchProjectComplete(projects);
          }else {
            return new SearchProjectError("Failed for search project");
          }
        }),
        catchError(error => of(new SearchProjectError(error)))
      )
    )
  );
}
