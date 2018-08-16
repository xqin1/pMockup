

import { Injectable } from '@angular/core';
import { Observable ,  of } from 'rxjs';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { CONFIG } from '@app/core/config';

@Injectable()
export class AuthGuardLogInPageService implements CanActivate {
  constructor(
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean>|boolean {
      return of(true);
      // if(CONFIG.security.auth){
      //   return of(true);
      // }else{
      //   this.router.navigate(["/"]);
      //   return of(false);
      // }
    }
}
