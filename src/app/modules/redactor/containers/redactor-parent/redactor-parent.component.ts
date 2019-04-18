import { Component, OnInit } from '@angular/core';
import { Title} from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import * as fromRedactor from '../../reducers/index.reducer';
import {Observable} from 'rxjs/Observable';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {Notification} from '@app/modules/document-management/model/notification.model';

@Component({
  selector: 'app-redactor-parent',
  templateUrl: './redactor-parent.component.html',
  styleUrls: ['./redactor-parent.component.css']
})
export class RedactorParentComponent implements OnInit {
  taskDataLoading$: Observable<boolean>;
  taskDataLoaded$: Observable<boolean>;
  taskNotification$: Observable<Notification>;
  projectNotification$: Observable<Notification>;


  config: MatSnackBarConfig = new MatSnackBarConfig();

  constructor(
    private titleService: Title,
    private store: Store<fromRedactor.State>,
    public snackBar: MatSnackBar,

  ) {
    this.taskDataLoaded$ = this.store.pipe(select(fromRedactor.getTaskDataLoaded));
    this.taskDataLoading$ = this.store.pipe(select(fromRedactor.getTaskDataLoading));
    this.taskNotification$ = this.store.pipe(select(fromRedactor.getTaskNotification));
    this.projectNotification$ = this.store.pipe(select(fromRedactor.getProjectNotification));

  }

  ngOnInit() {
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
