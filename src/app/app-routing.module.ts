import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent} from '@app/core/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'document-management',
    loadChildren: './modules/document-management/document-management.module#DocumentManagementModule',
  },
    { path: '**', component: PageNotFoundComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
