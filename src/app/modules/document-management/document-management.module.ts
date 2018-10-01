import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { MaterialModule} from '@app/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { reducers } from './reducers/index.reducer';
import { DocumentManagementRoutingModule, routedComponents } from './document-management-routing.module';
import { AuthModule} from '@app/modules/document-management/auth/auth.module';
import { PortalService} from '@app/modules/document-management/services/portal.service';
import {TaskEffects} from '@app/modules/document-management/effects/task.effect';
import { TaskListResolverService} from '@app/modules/document-management/services/task-list-resolver.service';
import { DocumentBuildDialogComponent } from './components/portal/document-build-dialog/document-build-dialog.component';
import { ContentLoaderModule } from '@netbasal/content-loader';
import { DocumentItemListComponent } from './components/portal/document-item-list/document-item-list.component';
import { DocumentUploadDialogComponent } from './components/portal/document-upload-dialog/document-upload-dialog.component';
import { NgxUploaderModule} from 'ngx-uploader';
import { NgMathPipesModule} from 'ngx-pipes';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    DocumentManagementRoutingModule,
    NgxDatatableModule,
    StoreModule.forFeature('documentManagement', reducers),
    EffectsModule.forFeature([TaskEffects]),
    AuthModule,
    ContentLoaderModule,
    NgxUploaderModule,
    NgMathPipesModule
  ],
  declarations: [routedComponents, DocumentBuildDialogComponent, DocumentItemListComponent, DocumentUploadDialogComponent],
  providers: [ PortalService, TaskListResolverService],
  entryComponents: [DocumentBuildDialogComponent, DocumentUploadDialogComponent]
})
export class DocumentManagementModule { }
