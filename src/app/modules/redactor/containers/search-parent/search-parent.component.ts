import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import * as SearchAppNumActions from '../../actions/search-appnum.action';
import * as SearchProjectActions from '../../actions/search-project.action';
import * as fromRedactor from '../../reducers/index.reducer';


@Component({
  selector: 'app-search-parent',
  templateUrl: './search-parent.component.html',
  styleUrls: ['./search-parent.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchParentComponent implements OnInit {
  appNumber$: Observable<number[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;
  projectAccumulateMode$: Observable<boolean>;
  constructor(
    private store: Store<fromRedactor.State>
  ) {
    this.appNumber$ = store.pipe(select(fromRedactor.getSearchAppNumber));
    this.loading$ = store.pipe(select(fromRedactor.getSearchAppNumLoading));
    this.error$ = store.pipe(select(fromRedactor.getSearchAppNumError));
    this.projectAccumulateMode$ = store.pipe(select(fromRedactor.getAccumulateMode));
  }

  search(query: string) {
    this.store.dispatch(new SearchAppNumActions.SearchAppNum(query));
  }

  onSearchProjects(query: string) {
    this.store.dispatch(new SearchProjectActions.SearchProject(query));
    this.store.dispatch(new SearchAppNumActions.SearchAppNum(''));
  }

  onAccumulateModeChange(value: boolean){
    this.store.dispatch(new SearchProjectActions.SearchProjectAccumulate(value));
  }
  ngOnInit() {
  }

}
