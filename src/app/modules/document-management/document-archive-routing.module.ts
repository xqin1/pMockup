import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentListParentComponent} from './containers/document-list-parent-page/document-list-parent.component';
import { DocumentListComponent} from './components/document-list/document-list.component';
import {NavigationComponent} from '@app/modules/document-management/components/navigation/navigation.component';
import {DocumentArchiveParentPageComponent} from '@app/modules/document-management/containers/document-archive-parent-page/document-archive-parent-page.component';
import { DocumentListResolverService} from '@app/modules/document-management/services/document-list-resolver.service';
import { DocumentValidateParentPageComponent} from '@app/modules/document-management/containers/document-validate-parent-page/document-validate-parent-page.component';
import { DocumentValidationComponent} from '@app/modules/document-management/components/document-validation/document-validation.component';
import { DocumentConfirmationParentPageComponent} from '@app/modules/document-management/containers/document-confirmation-parent-page/document-confirmation-parent-page.component';
import { DocumentConfirmationComponent} from '@app/modules/document-management/components/document-confirmation/document-confirmation.component';
import { FilePreviewDialogComponent} from '@app/modules/document-management/components/file-preview-dialog/file-preview-dialog.component';
import { ReArchiveDialogComponent} from '@app/modules/document-management/components/re-archive-dialog/re-archive-dialog.component';

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

      },
      {
        path: 'confirmation/:documentId',
        component: DocumentConfirmationParentPageComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentManagementRoutingModule { }
export const routedComponents = [DocumentListParentComponent, NavigationComponent,
  DocumentListComponent, DocumentArchiveParentPageComponent, DocumentValidateParentPageComponent,
  DocumentValidationComponent, DocumentConfirmationParentPageComponent, DocumentConfirmationComponent,
  FilePreviewDialogComponent, ReArchiveDialogComponent];
