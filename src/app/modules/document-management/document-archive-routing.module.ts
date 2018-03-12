import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentListParentComponent} from './containers/document-list-parent-page/document-list-parent.component';
import { DocumentListComponent} from './components/document-list/document-list.component';
import {DocumentArchiveParentPageComponent} from '@app/modules/document-management/containers/document-archive-parent-page/document-archive-parent-page.component';
import { DocumentListResolverService} from '@app/modules/document-management/services/document-list-resolver.service';
import { DocumentValidateParentPageComponent} from '@app/modules/document-management/containers/document-validate-parent-page/document-validate-parent-page.component';
import { DocumentValidationComponent} from '@app/modules/document-management/components/document-validation/document-validation.component';
import { FilePreviewDialogComponent} from '@app/modules/document-management/components/file-preview-dialog/file-preview-dialog.component';
import { DocumentDetailComponent} from '@app/modules/document-management/components/document-detail/document-detail.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentArchiveParentPageComponent,
    resolve: {
      // data: DocumentListResolverService
    },
    children: [
      {path: 'document-list', redirectTo: 'document-list', pathMatch: 'full'},
      {
        path: 'document-list/:objectId/:userId',
        component: DocumentListParentComponent,
        resolve: {
            data: DocumentListResolverService
        }
      },
      {
        path: 'validation/:documentId',
        component: DocumentValidateParentPageComponent,

      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentManagementRoutingModule { }
export const routedComponents = [DocumentListParentComponent,
  DocumentListComponent, DocumentArchiveParentPageComponent, DocumentValidateParentPageComponent,
  DocumentValidationComponent,
  FilePreviewDialogComponent, DocumentDetailComponent];
