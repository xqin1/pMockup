import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentArchiveComponent} from './containers/document-archive-page/document-archive.component';
import { DocumentLinkComponent} from './containers/document-link-page/document-link.component';
import { DocumentListComponent} from './containers/document-list-page/document-list.component';
import {DocumentParentPageComponent} from '@app/modules/document-management/containers/document-parent-page/document-parent-page.component';
import { DocumentListResolverService} from '@app/modules/document-management/services/document-list-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: DocumentParentPageComponent,
    resolve: {
      data: DocumentListResolverService
    },
    children: [
      {path: '', redirectTo: 'document-list', pathMatch: 'full'},
      {
        path: 'document-list',
        component: DocumentListComponent
      },
      {path: 'document-link/:id', component: DocumentLinkComponent},
      {path: 'document-archive/:id', component: DocumentArchiveComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentManagementRoutingModule { }
export const routedComponents = [DocumentArchiveComponent, DocumentLinkComponent,
  DocumentListComponent, DocumentParentPageComponent];
