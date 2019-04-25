import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import { Title} from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import * as fromRedactor from '../../reducers/index.reducer';
import {Observable} from 'rxjs/Observable';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {Notification} from '@app/core/model/common/notification.model';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {TaskDataLoad} from '@app/modules/redactor/actions/task.action';
import { CookieService} from 'ngx-cookie';
import {environment} from '@env/environment';
import {UserDataLoad} from '@app/modules/redactor/actions/user.action';

@Component({
  selector: 'app-redactor-parent',
  templateUrl: './redactor-parent.component.html',
  styleUrls: ['./redactor-parent.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RedactorParentComponent implements OnInit, OnDestroy {
  taskDataLoading$: Observable<boolean>;
  taskDataLoaded$: Observable<boolean>;
  userDataLoading$: Observable<boolean>;
  userDataLoaded$: Observable<boolean>;
  taskNotification$: Observable<Notification>;
  projectNotification$: Observable<Notification>;
  config: MatSnackBarConfig = new MatSnackBarConfig();
  sub: Subscription;
  constructor(
    private titleService: Title,
    private store: Store<fromRedactor.State>,
    public snackBar: MatSnackBar,
    public route: ActivatedRoute,
    private cookieService: CookieService
  ) {
    this.taskDataLoaded$ = this.store.pipe(select(fromRedactor.getTaskDataLoaded));
    this.taskDataLoading$ = this.store.pipe(select(fromRedactor.getTaskDataLoading));
    this.userDataLoaded$ = this.store.pipe(select(fromRedactor.getUserDataLoaded));
    this.userDataLoading$ = this.store.pipe(select(fromRedactor.getUserDataLoading));
    this.taskNotification$ = this.store.pipe(select(fromRedactor.getTaskNotification));
    this.projectNotification$ = this.store.pipe(select(fromRedactor.getProjectNotification));

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const taskId = params["taskId"];
      if (taskId) {
        this.store.dispatch(new TaskDataLoad(taskId));
      }else{
        console.log("taskId is required in the URL");
      }
      // for user
      if (environment.attaskSession === null) {
        const attaskSession = this.cookieService.get("attask");
        console.log("get attask session" + attaskSession);
        if (typeof attaskSession !== 'undefined') {
          this.store.dispatch(new UserDataLoad(attaskSession.substr(0, 32)));
        }else{
          console.log("cannot get attask cookie");
        }
      }else {
        const sessionId = environment.attaskSession;
        this.store.dispatch(new UserDataLoad(sessionId));
      }
    });
    this.titleService.setTitle("ANDA Redactor");

    this.taskNotification$.subscribe(notification => {
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
    this.projectNotification$.subscribe(notification => {
      setTimeout(() => {
        if (notification.display) {
          if (notification.duration !== null) {
            this.config.duration = notification.duration;
          }else{
            this.config.duration = 100000;
          }
          if (notification.message !== null) {
            this.snackBar.open(notification.message, "" , this.config);
          }
        }
      });

    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
