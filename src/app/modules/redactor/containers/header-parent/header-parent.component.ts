import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { Store, select} from '@ngrx/store';
import * as fromData from '../../reducers/index.reducer';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-header-parent',
  templateUrl: './header-parent.component.html',
  styleUrls: ['./header-parent.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderParentComponent implements OnInit {
  taskName$: Observable<string>;
  projectName$: Observable<string>;
  constructor(
    private store: Store<fromData.State>
  ) {
    this.taskName$ = this.store.pipe(select(fromData.getTaskName));
    this.projectName$ = this.store.pipe(select(fromData.getProjectName));
  }

  ngOnInit() {
  }

}
