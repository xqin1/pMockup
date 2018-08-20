
import { map, catchError, tap, exhaustMap} from "rxjs/operators";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs';

import * as AuthAction from '../actions/auth.action';
import { DMService} from '@app/core/services/dm.service';
import { PortalService} from '@app/modules/document-management/services/portal.service';

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$
    .ofType(AuthAction.LOGIN)
    .pipe(
        map((action: AuthAction.Login) => action.payload),
        exhaustMap(email =>
          this.dmService
            .portalLogIn(email)
            .pipe(
              map(result => {
                if (result) {
                  this.portalService.setCurrentUser(result);
                  return new AuthAction.LoginSuccess(true);
                } else {
                  return new AuthAction.LoginFailure('Email address is not valid');
                }
              })
            )
        ),
        catchError(error => of(new AuthAction.LoginFailure(error)))
    );

  @Effect({dispatch: false})
  loginSuccess$ = this.actions$
    .ofType(AuthAction.LOGIN_SUCCESS)
    .pipe(
      tap(() => {
        this.router.navigate(['/document-management/portal']);
      })
    );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$
    .ofType(AuthAction.LOGIN_REDIRECT, AuthAction.LOGOUT)
    .pipe(
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
