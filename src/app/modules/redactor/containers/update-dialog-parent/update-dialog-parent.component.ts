import {Component, Input, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {select, Store} from '@ngrx/store';
import * as fromRedactor from '@app/modules/redactor/reducers/index.reducer';


@Component({
  selector: 'app-update-dialog-parent',
  templateUrl: './update-dialog-parent.component.html',
  styleUrls: ['./update-dialog-parent.component.css']
})
export class UpdateDialogParentComponent implements OnInit {
  selectionIds$: Observable<string[]>;
  taskId$: Observable<string>;
  projectAttachedTemplate$: Observable<string[]>;
  attachTemplateComplete$: Observable<boolean>;
  attachTemplateAllComplete$: Observable<boolean>;

  constructor(
    private store: Store<fromRedactor.State>,
    private dialogRef: MatDialogRef<UpdateDialogParentComponent>

  ) {
    this.selectionIds$ = this.store.pipe(select(fromRedactor.getSelectionProjectIds));
    this.taskId$ = this.store.pipe(select(fromRedactor.getTaskId));
    this.projectAttachedTemplate$ = this.store.pipe(select(fromRedactor.getProjectTemplateAttached));
    this.attachTemplateComplete$ = this.store.pipe(select(fromRedactor.getTemplateAttachComplete));
    this.attachTemplateAllComplete$ = this.store.pipe(select(fromRedactor.getTemplateAttachAllComplete));
  }

  ngOnInit() {
  }

}
