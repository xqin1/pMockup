import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentListParentComponent} from './containers/document-list-parent-page/document-list-parent.component';
import { DocumentListComponent} from './components/document-list/document-list.component';
import {NavigationComponent} from '@app/modules/document-management/components/navigation/navigation.component';
import {DocumentArchiveParentPageComponent} from '@app/modules/document-management/containers/document-archive-parent-page/document-archive-parent-page.component';
import { DocumentListResolverService} from '@app/modules/document-management/services/document-list-resolver.service';

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
  DocumentListComponent, DocumentArchiveParentPageComponent];
