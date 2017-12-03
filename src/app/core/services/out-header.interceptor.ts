import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '@env/environment';

@Injectable()
export class OutHeaderInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header.
    req = req.clone({headers: req.headers.set('Content-Type', 'application/json')});
    // req = req.clone({headers: req.headers.set('custom-header', '1234')});
    //
    // if (environment.OHSString) {
    //   req = req.clone({headers: req.headers.set('Access-Control-Allow-Origin', '*')});
    //   req = req.clone({headers: req.headers.set('Access-Control-Allow-Headers', '*')});
    //   req = req.clone({headers: req.headers.set('Access-Control-Expose-Headers', '*')});
    //   req = req.clone({headers: req.headers.set('Access-Control-Allow-Credentials', 'true')});
    //
    //   //req = req.clone({headers: req.headers.set('Cookie', environment.OHSString)});
    // }

    // Pass on the cloned request instead of the original request.
    return next.handle(req);
  }
}

