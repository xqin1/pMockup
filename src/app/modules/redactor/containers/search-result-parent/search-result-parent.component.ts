import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as SearchProjectActions from '../../actions/search-project.action';
import * as fromRedactor from '../../reducers/index.reducer';

@Component({
  selector: 'app-search-result-parent',
  templateUrl: './search-result-parent.component.html',
  styleUrls: ['./search-result-parent.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultParentComponent implements OnInit {
  projectIds$: Observable<string[]>;
  selectionIds$: Observable<string[]>;
  constructor(
    private store: Store<fromRedactor.State>
  ) {
    this.projectIds$ = this.store.pipe(select(fromRedactor.getSearchProjectIds));
    this.selectionIds$ = this.store.pipe(select(fromRedactor.getSelectionProjectIds));

  }

  onSelectProject(projectIds: string[]) {
    this.store.dispatch(new SearchProjectActions.SelectProject(projectIds));
  }
  ngOnInit() {
  }

}
