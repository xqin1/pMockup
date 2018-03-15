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
  DocumentListComponent, DocumentManagementParentPageComponent, DocumentMetadataParentPageComponent,
  DocumentMetadataComponent,
  FilePreviewDialogComponent, DocumentDetailComponent];
