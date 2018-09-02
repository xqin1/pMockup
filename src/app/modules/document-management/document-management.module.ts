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
import {TaskEffects} from '@app/modules/document-management/effects/task.effect';
import { TaskListResolverService} from '@app/modules/document-management/services/task-list-resolver.service';
import { TaskListItemComponent } from './components/portal/task-list-item/task-list-item.component';
import { DocumentItemComponent } from './components/portal/document-item/document-item.component';
import { TaskApprovalComponent } from './components/portal/task-approval/task-approval.component';

@NgModule({
  imports: [
    FlexLayoutModule,
    SharedModule,
    DocumentManagementRoutingModule,
    NgxDatatableModule,
    StoreModule.forFeature('documentManagement', reducers),
    EffectsModule.forFeature([DocumentEffects, TaskEffects]),
    AuthModule
  ],
  declarations: [routedComponents, TaskListItemComponent, DocumentItemComponent, TaskApprovalComponent],
  providers: [ DocumentManagementService, DocumentListResolverService, PortalService, TaskListResolverService],
  entryComponents: [FilePreviewDialogComponent, NotificationComponent, ArchiveConfirmationDialogComponent]
})
export class DocumentManagementModule { }
