import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '@app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { reducers } from './reducers/index.reducer';
import { DocumentListResolverService} from '@app/modules/document-management/services/document-list-resolver.service';
import { DocumentManagementService} from '@app/modules/document-management/services/document-management.service';
import { DocumentManagementRoutingModule, routedComponents } from './document-management-routing.module';
import { FilePreviewDialogComponent } from './components/file-preview-dialog/file-preview-dialog.component';
import { NotificationComponent} from '@app/shared/components/notification/notification.component';
import {DocumentEffects} from '@app/modules/document-management/effects/document.effect';
import {ArchiveConfirmationDialogComponent} from '@app/modules/document-management/components/archive-confirmation-dialog/archive-confirmation-dialog.component';

@NgModule({
  imports: [
    FlexLayoutModule,
    SharedModule,
    DocumentManagementRoutingModule,
    NgxDatatableModule,
    StoreModule.forFeature('documentManagement', reducers),
    EffectsModule.forFeature([DocumentEffects])
  ],
  declarations: [routedComponents],
  providers: [ DocumentManagementService, DocumentListResolverService],
  entryComponents: [FilePreviewDialogComponent, NotificationComponent, ArchiveConfirmationDialogComponent]
})
export class DocumentManagementModule { }
