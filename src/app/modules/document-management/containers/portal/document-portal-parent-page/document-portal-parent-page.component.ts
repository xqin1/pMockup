import {Component, OnInit, ViewChild} from '@angular/core';
import { TaskListResolverService} from '@app/modules/document-management/services/task-list-resolver.service';
import { Observable} from 'rxjs/index';
import { select, Store } from '@ngrx/store';
import * as fromTask from '@app/modules/document-management/reducers/index.reducer';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import { environment} from '@env/environment';
import {DomSanitizer} from '@angular/platform-browser';
import { CookieService} from 'ngx-cookie';
import { timer} from 'rxjs/index';
import {takeWhile} from 'rxjs/internal/operators';

@Component({
  selector: 'app-document-portal-parent-page',
  templateUrl: './document-portal-parent-page.component.html',
  styleUrls: ['./document-portal-parent-page.component.css']
})
export class DocumentPortalParentPageComponent implements OnInit {
  taskListLoading$: Observable<boolean>;
  taskListLoaded$: Observable<boolean>;
  taskLoadIds$: Observable<string[]>;
  config: MatSnackBarConfig = new MatSnackBarConfig();
  private waitSessionid = true;

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
    this.config.verticalPosition = "top";
    this.config.panelClass = ['snack-bar'];
  }

  getIframeURL() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(environment.getCookieURL);
  }

  getCookie(cookieName: string) {
    return this.cookieService.get(cookieName);
  }

  ngOnInit() {
    timer(0, 500).pipe(
      takeWhile(() => this.waitSessionid)
    ).subscribe(() => {
      const attaskSession = this.getCookie("attask");
      console.log("get cookie in timer" + attaskSession);
      if (attaskSession) {
        console.log(attaskSession);
        this.waitSessionid = false;
      }
    })
    this.taskListResolveService.resolve();
    this.taskLoadIds$.subscribe(result => {
      if (result.length > 0) {
        this.snackBar.open("Retrieving Task Information...", "" , this.config);
      }else{
        this.snackBar.dismiss();
      }
    });
    // this.taskListLoading$.subscribe(result => {
    //   if (result !== null && typeof result !== 'undefined' && result) {
    //     this.snackBar.open("Retrieving Tasks Information...", "" , this.config);
    //   }else{
    //     this.snackBar.dismiss();
    //   }
    // });
  }

}
