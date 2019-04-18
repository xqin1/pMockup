import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { RedactorService} from '@app/modules/redactor/services/redactor.service';
import { Observable ,  of } from 'rxjs';
import * as fromRedactor from '@app/modules/redactor/reducers/index.reducer';
import { take, map, filter, switchMap, first } from 'rxjs/operators';
import {TaskDataLoad} from '@app/modules/redactor/actions/task.action';

@Injectable()
export class TaskResolverService implements Resolve<any> {
  constructor(
    private redactorService: RedactorService,
    private store: Store<fromRedactor.State>,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    const taskId = route.paramMap.get("taskId");
    if (taskId) {
      this.store.dispatch(new TaskDataLoad(taskId));
      return this.waitForTaskListToLoad().pipe(
        switchMap((loaded) => {
          return loaded ? of(true) : of(false);
        })
      );
    }else{
      console.log("taskId is required in the URL");
    }
  }

  waitForTaskListToLoad(): Observable<boolean> {
    return this.store.pipe(
      select(fromRedactor.getTaskDataLoaded),
      map(loaded => loaded),
      first(loaded => loaded === true)
    );
  }

}
