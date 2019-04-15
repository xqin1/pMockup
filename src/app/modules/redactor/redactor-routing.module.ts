import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RedactorParentComponent} from '@app/modules/redactor/containers/redactor-parent/redactor-parent.component';
import { TaskResolverService} from '@app/modules/redactor/services/task-resolver.service';

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
  RedactorParentComponent
];
