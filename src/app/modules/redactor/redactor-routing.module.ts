import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RedactorParentComponent} from '@app/modules/redactor/containers/redactor-parent/redactor-parent.component';
import { TaskResolverService} from '@app/modules/redactor/services/task-resolver.service';
import {HeaderParentComponent} from '@app/modules/redactor/containers/header-parent/header-parent.component';
import {SearchParentComponent} from '@app/modules/redactor/containers/search-parent/search-parent.component';
import {SearchComponent} from '@app/modules/redactor/components/search/search.component';
import {SearchResultParentComponent} from '@app/modules/redactor/containers/search-result-parent/search-result-parent.component';
import {SearchResultComponent} from '@app/modules/redactor/components/search-result/search-result.component';
import {SelectionParentComponent} from '@app/modules/redactor/containers/selection-parent/selection-parent.component';
import {SelectionComponent} from '@app/modules/redactor/components/selection/selection.component';
import {UpdateDialogComponent} from '@app/modules/redactor/components/update-dialog/update-dialog.component';
import { HeaderComponent} from '@app/modules/redactor/components/header/header.component';

const routes: Routes = [
  {
    path: ':taskId',
    component: RedactorParentComponent,
    resolve: {
       data: TaskResolverService
    },
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RedactorRoutingModule { }
export const routedComponents = [
  RedactorParentComponent, HeaderParentComponent, HeaderComponent, SearchParentComponent, SearchComponent,
  SearchResultParentComponent, SearchResultComponent, SelectionParentComponent, SelectionComponent,
  UpdateDialogComponent
];
