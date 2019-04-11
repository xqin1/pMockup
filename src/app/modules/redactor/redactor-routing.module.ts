import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RedactorParentComponent} from '@app/modules/redactor/containers/redactor-parent/redactor-parent.component';

const routes: Routes = [
  {
    path: ':taskId',
    component: RedactorParentComponent,
    // resolve: {
    //   // data: TaskListResolverService
    // },
   // canActivate: [AuthGuardService],
    children: [
      // {path: 'document-list', redirectTo: 'document-list', pathMatch: 'full'},
      // {
      //   path: 'document-list/:objectId/:userId',
      //   component: DocumentListParentComponent,
      //   resolve: {
      //     data: DocumentListResolverService
      //   }
      // },
      // {
      //   path: 'document-metadata/:documentId',
      //   component: DocumentMetadataParentPageComponent,
      //
      // },
      // {
      //   path: 'document-link/:documentId',
      //   component: DocumentLinkParentComponent
      // },
      // {
      //   path: 'document-eligibility/:documentId',
      //   component: DocumentEligibilityParentComponent
      // }
    ]
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
