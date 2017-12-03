import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpfDecisionRequestComponent} from '@app/modules/inspection-management/components/opf-decision-request/opf-decision-request.component';
import { AnotherInspectionFormComponent} from '@app/modules/inspection-management/components/another-inspection-form/another-inspection-form.component';
import { InspectionParentPageComponentComponent} from '@app/modules/inspection-management/containers/inspection-parent-page-component/inspection-parent-page-component.component';

const routes: Routes = [
  {
    path: '',
    component: InspectionParentPageComponentComponent,
    children: [
      // {path: '', redirectTo: 'document-list', pathMatch: 'full'},
      {path: 'opf-decision-request/:id', component: OpfDecisionRequestComponent},
      {path: 'another-inspection-form/:id', component: AnotherInspectionFormComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InspectionManagementRoutingModule { }
export const routedComponents = [ OpfDecisionRequestComponent, AnotherInspectionFormComponent, InspectionParentPageComponentComponent];
