import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuth from '@app/modules/document-management/auth/reducers';
import * as AuthAction from '@app/modules/document-management/auth/actions/auth.action';
import { CookieService} from 'ngx-cookie';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  constructor(
    private store: Store<fromAuth.State>,
    private cookieService: CookieService
  ) { }
  error$ = this.store.select(fromAuth.getLoginPageError);
  onSubmit($event: string) {
    this.store.dispatch(new AuthAction.Login($event['email']));
  }
  ngOnInit() {
    this.cookieService.put("attask", "somevalue");
  }

}
