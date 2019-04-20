import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {select, Store} from '@ngrx/store';
import * as fromRedactor from '@app/modules/redactor/reducers/index.reducer';


@Component({
  selector: 'app-update-dialog-parent',
  templateUrl: './update-dialog-parent.component.html',
  styleUrls: ['./update-dialog-parent.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateDialogParentComponent implements OnInit {
  selectionIds$: Observable<string[]>;
  projectTemplateAttached$: Observable<string[]>;

  templateAttachError$: Observable<string>;
  attachTemplateAllComplete$: Observable<boolean>;

  projectUpdating$: Observable<boolean>;
  projectUpdateError$: Observable<string>;
  projectUpdateComplete$: Observable<boolean>;


  constructor(
    private store: Store<fromRedactor.State>,
    private dialogRef: MatDialogRef<UpdateDialogParentComponent>

  ) {
    this.selectionIds$ = this.store.pipe(select(fromRedactor.getSelectionProjectIds));
    this.projectTemplateAttached$ = this.store.pipe(select(fromRedactor.getProjectTemplateAttached));

    this.templateAttachError$ = this.store.pipe(select(fromRedactor.getTemplateError));
    this.attachTemplateAllComplete$ = this.store.pipe(select(fromRedactor.getTemplateAttachAllComplete));

    this.projectUpdating$ = this.store.pipe(select(fromRedactor.getProjectUpdating));
    this.projectUpdateError$ = this.store.pipe(select(fromRedactor.getProjectUpdateError));
    this.projectUpdateComplete$ = this.store.pipe(select(fromRedactor.getProjectUpdateComplete));
  }

  ngOnInit() {
  }

}
