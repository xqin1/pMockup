import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '@app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './reducers/index.reducer';
import { DocumentListResolverService} from '@app/modules/document-management/services/document-list-resolver.service';
import { DocumentManagementService} from '@app/modules/document-management/services/document-management.service';
import { DocumentManagementRoutingModule, routedComponents } from './document-management-routing.module';
import { DocumentListComponent } from './components/document-list/document-list.component';

@NgModule({
  imports: [
    FlexLayoutModule,
    SharedModule,
    DocumentManagementRoutingModule,
    StoreModule.forFeature('documentManagement', reducers)
  ],
  declarations: [routedComponents, DocumentListComponent],
  providers: [ DocumentManagementService, DocumentListResolverService]
})
export class DocumentManagementModule { }
