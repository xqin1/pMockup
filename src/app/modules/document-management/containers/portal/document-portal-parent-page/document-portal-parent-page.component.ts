import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { TaskListResolverService} from '@app/modules/document-management/services/task-list-resolver.service';
import { Observable} from 'rxjs/index';
import { select, Store } from '@ngrx/store';
import * as fromTask from '@app/modules/document-management/reducers/index.reducer';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

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
  constructor(
    private taskListResolveService: TaskListResolverService,
    private store: Store<fromTask.State>,
    public snackBar: MatSnackBar
  ) {
    this.taskListLoading$ = this.store.pipe(select(fromTask.getTaskListLoading));
    this.taskListLoaded$ = this.store.pipe(select(fromTask.getTaskListLoaded));
    this.taskLoadIds$ = this.store.pipe(select(fromTask.getTaskLoadIds));
    this.config.verticalPosition = "top";
    this.config.panelClass = ['snack-bar'];
  }


  ngOnInit() {
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
