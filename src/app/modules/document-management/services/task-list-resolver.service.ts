import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { PortalService} from '@app/modules/document-management/services/portal.service';
import { Observable ,  of ,  forkJoin } from 'rxjs';
import * as fromTask from '@app/modules/document-management/reducers/index.reducer';
import { take, map, filter, switchMap, first } from 'rxjs/operators';
import {TaskListLoad} from '@app/modules/document-management/actions/task.action';

@Injectable()
export class TaskListResolverService implements Resolve<any> {
  constructor(
    private portalService: PortalService,
    private store: Store<fromTask.State>,
  ) {}

  resolve(): Observable<boolean> | Promise<boolean> {
    console.log("resolve service");
    this.store.dispatch(new TaskListLoad());
    return this.waitForTaskListToLoad().pipe(
      switchMap((loaded) => {
        return loaded ? of(true) : of(false);
      })
    );
  }
  waitForTaskListToLoad(): Observable<boolean> {
    return this.store.pipe(
      select(fromTask.getTaskListLoaded),
      map(loaded => loaded),
      first(loaded => loaded === true)
    );
  }

}
