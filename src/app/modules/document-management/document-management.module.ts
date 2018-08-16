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
import { FilePreviewDialogComponent } from './components/document/file-preview-dialog/file-preview-dialog.component';
import { NotificationComponent} from '@app/shared/components/notification/notification.component';
import {DocumentEffects} from '@app/modules/document-management/effects/document.effect';
import {ArchiveConfirmationDialogComponent} from '@app/modules/document-management/components/document/archive-confirmation-dialog/archive-confirmation-dialog.component';
import { AuthModule} from '@app/modules/document-management/auth/auth.module';
import { PortalService} from '@app/modules/document-management/services/portal.service';

@NgModule({
  imports: [
    FlexLayoutModule,
    SharedModule,
    DocumentManagementRoutingModule,
    NgxDatatableModule,
    StoreModule.forFeature('documentManagement', reducers),
    EffectsModule.forFeature([DocumentEffects]),
    AuthModule
  ],
  declarations: [routedComponents],
  providers: [ DocumentManagementService, DocumentListResolverService, PortalService],
  entryComponents: [FilePreviewDialogComponent, NotificationComponent, ArchiveConfirmationDialogComponent]
})
export class DocumentManagementModule { }
