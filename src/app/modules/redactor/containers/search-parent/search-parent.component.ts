import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import * as SearchActions from '../../actions/search.action';
import * as SearchProjectActions from '../../actions/search-project.action';
import * as fromRedactor from '../../reducers/index.reducer';


@Component({
  selector: 'app-search-parent',
  templateUrl: './search-parent.component.html',
  styleUrls: ['./search-parent.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchParentComponent implements OnInit {
  searchQuery$: Observable<string>;
  appNumber$: Observable<number[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;
  projectAccumulateMode$: Observable<boolean>;
  constructor(
    private store: Store<fromRedactor.State>
  ) {
    this.searchQuery$ = store.pipe(
      select(fromRedactor.getSearchQuery),
      take(1)
    );
    this.appNumber$ = store.pipe(select(fromRedactor.getSearchAppNumber));
    this.loading$ = store.pipe(select(fromRedactor.getSearchLoading));
    this.error$ = store.pipe(select(fromRedactor.getSearchError));
    this.projectAccumulateMode$ = store.pipe(select(fromRedactor.getAccumulateMode));
  }

  search(query: string) {
    this.store.dispatch(new SearchActions.Search(query));
  }

  onSearchProjects(query: string) {
    this.store.dispatch(new SearchProjectActions.SearchProject(query));
  }

  onAccumulateModeChange(value: boolean){
    this.store.dispatch(new SearchProjectActions.SearchProjectAccumulate(value));
  }
  ngOnInit() {
  }

}
