
import {take, map} from 'rxjs/operators';


import { Observable ,  of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import * as AuthAction from '../actions/auth.action';
import * as fromAuth from '../reducers';
import { CONFIG } from '@app/core/config';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private store: Store<fromAuth.State>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
      return this.store
        .select(fromAuth.getLoggedIn).pipe(
        map(authed => {
          if (!authed) {
            this.store.dispatch(new AuthAction.LoginRedirect());
            return false;
          }
          return true;
        }),
        take(1));
    }
}
