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
  constructor(
    private store: Store<fromRedactor.State>
  ) {
    this.selectionIds$ = this.store.pipe(select(fromRedactor.getSelectionProjectIds));
  }

  onRemoveSelection(projectId: string) {
    this.store.dispatch(new SearchProjectActions.RemoveSelectedProject(projectId));
  }
  onConfirmProject(projectIds: string) {
   // this.store.dispatch(new SearchProjectActions.ConfirmProject(["1"]));
  }
  ngOnInit() {
  }

}
