import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentListParentComponent} from './containers/document-list-parent-page/document-list-parent.component';
import { DocumentListComponent} from './components/document-list/document-list.component';
import { DocumentManagementParentPageComponent} from '@app/modules/document-management/containers/document-management-parent-page/document-management-parent-page.component';
import { DocumentListResolverService} from '@app/modules/document-management/services/document-list-resolver.service';
import { DocumentMetadataParentPageComponent} from '@app/modules/document-management/containers/document-metadata-parent-page/document-metadata-parent-page.component';
import { DocumentMetadataComponent} from '@app/modules/document-management/components/document-metadata/document-metadata.component';
import { FilePreviewDialogComponent} from '@app/modules/document-management/components/file-preview-dialog/file-preview-dialog.component';
import { DocumentDetailComponent} from '@app/modules/document-management/components/document-detail/document-detail.component';
import { DocumentLinkComponent} from '@app/modules/document-management/components/document-link/document-link.component';
import { DocumentLinkParentComponent} from '@app/modules/document-management/containers/document-link-parent-page/document-link-parent.component';
import { ArchiveConfirmationDialogComponent} from '@app/modules/document-management/components/archive-confirmation-dialog/archive-confirmation-dialog.component';
import { DocumentEligibilityParentComponent} from '@app/modules/document-management/containers/document-eligibility-parent-page/document-eligibility-parent.component';
import { DocumentEligibilityComponent} from '@app/modules/document-management/components/document-eligibility/document-eligibility.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentManagementParentPageComponent,
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
        path: 'document-metadata/:documentId',
        component: DocumentMetadataParentPageComponent,

      },
      {
        path: 'document-link/:documentId',
        component: DocumentLinkParentComponent
      },
      {
        path: 'document-eligibility/:documentId',
        component: DocumentEligibilityParentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentManagementRoutingModule { }
export const routedComponents = [
    DocumentManagementParentPageComponent,
    DocumentListParentComponent, DocumentListComponent, DocumentDetailComponent,
    DocumentMetadataParentPageComponent, DocumentMetadataComponent,
    DocumentLinkParentComponent, DocumentLinkComponent,
    DocumentEligibilityParentComponent, DocumentEligibilityComponent,
    ArchiveConfirmationDialogComponent,
    FilePreviewDialogComponent];
