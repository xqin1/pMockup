import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as SearchProjectActions from '../../actions/search-project.action';
import * as fromRedactor from '../../reducers/index.reducer';

@Component({
  selector: 'app-selection-parent',
  templateUrl: './selection-parent.component.html',
  styleUrls: ['./selection-parent.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectionParentComponent implements OnInit {
  selectionIds$: Observable<string[]>;
  projectIds$: Observable<string[]>;
  taskId$: Observable<string>;
  projectAttachedTemplate$: Observable<string[]>;
  attachTemplateComplete$: Observable<boolean>;
  attachTemplateAllComplete$: Observable<boolean>;
  userEmail$: Observable<string>;

  constructor(
    private store: Store<fromRedactor.State>
  ) {
    this.selectionIds$ = this.store.pipe(select(fromRedactor.getSelectionProjectIds));
    this.projectIds$ = this.store.pipe(select(fromRedactor.getSearchProjectIds));
    this.taskId$ = this.store.pipe(select(fromRedactor.getTaskId));
    this.projectAttachedTemplate$ = this.store.pipe(select(fromRedactor.getProjectTemplateAttached));
    this.attachTemplateComplete$ = this.store.pipe(select(fromRedactor.getTemplateAttachComplete));
    this.attachTemplateAllComplete$ = this.store.pipe(select(fromRedactor.getTemplateAttachAllComplete));
    this.userEmail$ = this.store.pipe(select(fromRedactor.getUserEmail));
  }

  onRemoveSelection(projectId: string) {
    this.store.dispatch(new SearchProjectActions.RemoveSelectedProject(projectId));
  }
  onUpdateRedactorProject(update: string) {
   this.store.dispatch(new SearchProjectActions.UpdateRedactorProject(update));
  }
  onAttachTemplate(projectId: string) {
    this.store.dispatch(new SearchProjectActions.AttachTemplate(projectId));
  }
  onFinishAttachTemplate() {
    this.store.dispatch(new SearchProjectActions.AttachAllTemplateComplete());
  }
  ngOnInit() {
  }

}
