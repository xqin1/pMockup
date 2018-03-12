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
import { FilePreviewDialogComponent } from './components/file-preview-dialog/file-preview-dialog.component';
import { NotificationComponent} from '@app/shared/components/notification/notification.component';
import { DocumentMetadataComponent } from './components/document-metadata/document-metadata.component';

@NgModule({
  imports: [
    FlexLayoutModule,
    SharedModule,
    DocumentManagementRoutingModule,
    NgxDatatableModule,
    StoreModule.forFeature('documentManagement', reducers)
  ],
  declarations: [routedComponents, DocumentMetadataComponent],
  providers: [ DocumentManagementService, DocumentListResolverService],
  entryComponents: [FilePreviewDialogComponent, NotificationComponent]
})
export class DocumentArchiveModule { }
