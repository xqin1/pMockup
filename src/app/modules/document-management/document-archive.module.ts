import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '@app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { reducers } from './reducers/index.reducer';
import { DocumentListResolverService} from '@app/modules/document-management/services/document-list-resolver.service';
import { DocumentManagementService} from '@app/modules/document-management/services/document-management.service';
import { DocumentManagementRoutingModule, routedComponents } from './document-archive-routing.module';
import { DocumentListComponent } from './components/document-list/document-list.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { DocumentValidateParentPageComponent } from './containers/document-validate-parent-page/document-validate-parent-page.component';
import { DocumentValidationComponent } from './components/document-validation/document-validation.component';
import { DocumentConfirmationComponent } from './components/document-confirmation/document-confirmation.component';
import { DocumentConfirmationParentPageComponent } from './containers/document-confirmation-parent-page/document-confirmation-parent-page.component';
import { ReArchiveDialogComponent } from './components/re-archive-dialog/re-archive-dialog.component';
import { FilePreviewDialogComponent } from './components/file-preview-dialog/file-preview-dialog.component';

@NgModule({
  imports: [
    FlexLayoutModule,
    SharedModule,
    DocumentManagementRoutingModule,
    NgxDatatableModule,
    StoreModule.forFeature('documentManagement', reducers)
  ],
  declarations: [routedComponents],
  providers: [ DocumentManagementService, DocumentListResolverService],
  entryComponents: [ReArchiveDialogComponent, FilePreviewDialogComponent]
})
export class DocumentArchiveModule { }
