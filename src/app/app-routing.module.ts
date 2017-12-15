import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent} from '@app/core/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'document-management/:id',
    loadChildren: './modules/document-management/document-management.module#DocumentManagementModule',
  },
  {
    path: 'inspection-management',
    loadChildren: './modules/inspection-management/inspection-management.module#InspectionManagementModule',
  },
    { path: '**', component: PageNotFoundComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
