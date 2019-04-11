import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentPortalHeaderParentPageComponent} from '@app/modules/document-management/containers/portal/document-portal-header-parent-page/header-parent-page.component';
import { DocumentPortalParentPageComponent} from '@app/modules/document-management/containers/portal/document-portal-parent-page/document-portal-parent-page.component';
import { PortalHeaderComponent } from '@app/modules/document-management/components/portal/portal-header/portal-header.component';
import { TaskListParentPageComponent } from './containers/portal/task-list-parent-page/task-list-parent-page.component';
import { TaskListComponent } from './components/portal/task-list/task-list.component';
import { TaskDetailComponent } from './components/portal/task-detail/task-detail.component';
import { TaskDetailParentPageComponent } from './containers/portal/task-detail-parent-page/task-detail-parent-page.component';
import { TaskStateParentPageComponent } from './containers/portal/task-state-parent-page/task-state-parent-page.component';
import { TaskStateComponent } from './components/portal/task-state/task-state.component';
import { TaskStateBuildComponent } from './components/portal/task-state-build/task-state-build.component';
import { TaskStateConcurComponent } from './components/portal/task-state-concur/task-state-concur.component';
import { TaskStateSignComponent } from './components/portal/task-state-sign/task-state-sign.component';
import { TaskStateArchiveComponent } from './components/portal/task-state-archive/task-state-archive.component';
import { TaskListItemComponent } from './components/portal/task-list-item/task-list-item.component';
import { DocumentItemComponent } from './components/portal/document-item/document-item.component';
import { TaskApprovalComponent } from './components/portal/task-approval/task-approval.component';
const routes: Routes = [
  {
    path: 'kaleidoscope',
    component: DocumentPortalParentPageComponent,
    resolve: {
      // data: TaskListResolverService
    },
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
export class DocumentManagementRoutingModule { }
export const routedComponents = [
  DocumentPortalHeaderParentPageComponent,
  DocumentPortalParentPageComponent,
  PortalHeaderComponent,
  TaskListParentPageComponent,
  TaskListComponent,
  TaskDetailComponent,
  TaskDetailParentPageComponent,
  TaskStateParentPageComponent,
  TaskStateComponent,
  TaskStateBuildComponent,
  TaskStateConcurComponent,
  TaskStateSignComponent,
  TaskStateArchiveComponent,
  TaskListItemComponent,
  DocumentItemComponent,
  TaskApprovalComponent];
