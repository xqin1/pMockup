import {Component, OnInit, ViewChild} from '@angular/core';
import { TaskListResolverService} from '@app/modules/document-management/services/task-list-resolver.service';
import {interval, Observable} from 'rxjs/index';
import { select, Store } from '@ngrx/store';
import * as fromTask from '@app/modules/document-management/reducers/index.reducer';
import * as AuthAction from '@app/modules/document-management/auth/actions/auth.action';
import * as TaskAction from '@app/modules/document-management/actions/task.action';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import { environment} from '@env/environment';
import {DomSanitizer} from '@angular/platform-browser';
import { CookieService} from 'ngx-cookie';
import { timer} from 'rxjs/index';
import {delay, takeWhile} from 'rxjs/internal/operators';
import {Notification} from '@app/modules/document-management/model/notification.model';

@Component({
  selector: 'app-document-portal-parent-page',
  templateUrl: './document-portal-parent-page.component.html',
  styleUrls: ['./document-portal-parent-page.component.css']
})
export class DocumentPortalParentPageComponent implements OnInit {
  taskListLoading$: Observable<boolean>;
  taskListLoaded$: Observable<boolean>;
  taskLoadIds$: Observable<string[]>;
  notification$: Observable<Notification>;
  config: MatSnackBarConfig = new MatSnackBarConfig();
  public waitSessionid = true;

  constructor(
    private taskListResolveService: TaskListResolverService,
    private store: Store<fromTask.State>,
    public snackBar: MatSnackBar,
    public sanitizer: DomSanitizer,
    private cookieService: CookieService
  ) {
    this.taskListLoading$ = this.store.pipe(select(fromTask.getTaskListLoading));
    this.taskListLoaded$ = this.store.pipe(select(fromTask.getTaskListLoaded));
    this.taskLoadIds$ = this.store.pipe(select(fromTask.getTaskLoadIds));
    this.notification$ = this.store.pipe(select(fromTask.getNotification));

    this.config.verticalPosition = "top";
    this.config.panelClass = ['snack-bar'];
  }

  getIframeURL() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(environment.getCookieURL);
  }

  getCookie(cookieName: string) {
    return this.cookieService.get(cookieName);
  }

  removeCookie(cookieName: string) {
    return this.cookieService.remove(cookieName);
  }

  pollTaskList() {
    const pollInterval = timer(300000, 300000);
    pollInterval.subscribe(val => {
      console.log("polling task list #: " + val);
      this.store.dispatch(new TaskAction.TaskListLoad());
    });
  }
  ngOnInit() {
    if (environment.production) {
      this.removeCookie("attask");
      timer(0, 500).pipe(
        takeWhile(() => this.waitSessionid)
      ).subscribe(() => {
        const attaskSession = this.getCookie("attask");
        console.log("get cookie in timer" + attaskSession);
        if (typeof attaskSession !== 'undefined') {
          console.log(attaskSession);
          this.waitSessionid = false;
          this.store.dispatch(new AuthAction.Login(attaskSession.substr(0, 32)));
          this.pollTaskList();
        }
      });
    }else {
      const sessionId = "0059d18453234fdbbf3bc928bf334344";
      this.store.dispatch(new AuthAction.Login(sessionId));
      this.pollTaskList();
    }

    this.notification$.subscribe(notification => {
      setTimeout(() => {
        if (notification.display) {
          if (notification.duration !== null) {
            this.config.duration = notification.duration;
          }else{
            this.config.duration = 20000;
          }
          if (notification.message !== null) {
            this.snackBar.open(notification.message, "" , this.config);
          }
        }
      });

    });
  }

}
