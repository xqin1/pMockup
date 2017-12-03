import { NgModule } from '@angular/core';
import { SharedModule} from '@app/shared/shared.module';

import { InspectionManagementRoutingModule } from './inspection-management-routing.module';
import { routedComponents} from './inspection-management-routing.module';


@NgModule({
  imports: [
    SharedModule,
    InspectionManagementRoutingModule
  ],
  declarations: [routedComponents]
})
export class InspectionManagementModule { }
