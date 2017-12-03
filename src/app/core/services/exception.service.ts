import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ExceptionService {
  constructor() {}

  catchBadResponse: (errorResponse: any) => Observable<any> = (
    errorResponse: any,
  ) => {
    const res = <any>errorResponse;
    const emsg = res.message;
    console.log(`Error - Bad Response - ${emsg}`);
    return of(false);
  }
}
