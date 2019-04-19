import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {asyncScheduler, Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, debounceTime, skip, takeUntil} from 'rxjs/operators';
import { DMService } from '@app/core/services/dm.service';
import { RedactorService} from '@app/modules/redactor/services/redactor.service';
import { Task} from '@app/core/model/workfront/Task.model';

import {TaskDataLoad, TaskDataLoadError, TaskDataLoadSuccess, TaskActionTypes} from '@app/modules/redactor/actions/task.action';

import { SearchAppNum, SearchAppNumComplete, SearchAppNumError, SearchAppNumActionTypes} from '@app/modules/redactor/actions/search-appnum.action';
import { SearchProject, SearchProjectComplete, SearchProjectError, SearchProjectActionTypes} from '@app/modules/redactor/actions/search-project.action';
import { AttachTemplateComplete, AttachTemplateError} from '@app/modules/redactor/actions/search-project.action';
import {EMPTY} from 'rxjs/internal/observable/empty';
import {Project} from '@app/core/model/workfront/Project.model';
import {RedactorResponse} from '@app/modules/redactor/models/redactor-response.model';


@Injectable()
export class RedactorEffects {
  constructor(
    private actions$: Actions,
    private dmService: DMService,
    private redactorService: RedactorService
  ) {}


  @Effect()
  loadTask$: Observable<Action> = this.actions$.pipe(
    ofType<TaskDataLoad>(TaskActionTypes.TaskDataLoad),
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
  searchProject$: Observable<Action> = this.actions$.pipe(
    ofType<SearchProject>(SearchProjectActionTypes.SearchProject),
    map(action => action.payload),
    mergeMap((appNumber) =>
      this.dmService.getPostApprovalProjects("ANDA", appNumber).pipe(
        map((projects: Project[]) => {
          if (projects != null) {
            this.redactorService.addProjects(projects);
            const projectIds: string[] = [];
            for (const p of projects) {
              projectIds.push(p.ID);
            }
            return new SearchProjectComplete(projectIds);
          }else {
            return new SearchProjectError("Failed for search project");
          }
        }),
        catchError(error => of(new SearchProjectError(error)))
      )
    )
  );
  @Effect()
  attachTemplate$: Observable<Action> = this.actions$.pipe(
    ofType<SearchProject>(SearchProjectActionTypes.AttachTemplate),
    map(action => action.payload),
    mergeMap((projectId) =>
      this.dmService.attachRdactorTemplate(projectId).pipe(
        map((response: RedactorResponse) => {
          if (response.result === "success") {
            return new AttachTemplateComplete(projectId);
          }else {
            return new AttachTemplateError(projectId);
          }
        }),
        catchError(error => of(new AttachTemplateError(projectId)))
      )
    )
  );
  @Effect()
  searchAppNumber$ = ({ debounce = 300, scheduler = asyncScheduler } = {}): Observable<Action> => this.actions$.pipe(
      ofType<SearchAppNum>(SearchAppNumActionTypes.SearchAppNum),
      debounceTime(debounce, scheduler),
      map(action => action.payload),
      switchMap(query => {
        if (query === '') {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(SearchAppNumActionTypes.SearchAppNum),
          skip(1)
        );

        return this.dmService.getApplicationNumber("ANDA", query, 5).pipe(
          takeUntil(nextSearch$),
          map((appNumber: number[]) => new SearchAppNumComplete(appNumber)),
          catchError(err => of(new SearchAppNumError(err)))
        );
      })
  )
}
