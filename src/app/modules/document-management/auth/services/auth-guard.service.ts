
import {take, map} from 'rxjs/operators';


import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {select, Store } from '@ngrx/store';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import * as AuthAction from '../actions/auth.action';
import * as fromAuth from '../reducers';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private store: Store<fromAuth.State>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
      return this.store.pipe(
        select(fromAuth.getLoggedIn),
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
