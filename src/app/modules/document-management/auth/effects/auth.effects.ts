
import { map, catchError, tap, exhaustMap} from "rxjs/operators";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';

import * as AuthAction from '../actions/auth.action';
import * as TaskAction from '@app/modules/document-management/actions/task.action';
import { DMService} from '@app/core/services/dm.service';
import { PortalService} from '@app/modules/document-management/services/portal.service';

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthAction.LOGIN),
        map((action: AuthAction.Login) => action.payload),
        exhaustMap(sessionId =>
          this.dmService
            .getUserBySessionId(sessionId)
            .pipe(
              map(result => {
                if (result) {
                  this.portalService.setCurrentUser(result);
                  return new TaskAction.TaskListLoad();
                } else {
                  return new AuthAction.LoginFailure('Session is not valid');
                }
              })
            )
        ),
        catchError(error => of(new AuthAction.LoginFailure(error)))
    );

  @Effect({dispatch: false})
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthAction.LOGIN_SUCCESS),
      tap(() => {
        this.router.navigate(['/document-management/portal']);
      })
    );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(AuthAction.LOGIN_REDIRECT, AuthAction.LOGOUT),
      tap(authed => {
        this.router.navigate(['document-management/portal/login']);
      })
    );

  constructor(
    private actions$: Actions,
    private dmService: DMService,
    private router: Router,
    private portalService: PortalService
  ) {}
}
