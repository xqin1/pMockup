import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedactorRoutingModule, routedComponents } from '@app/modules/redactor/redactor-routing.module';
import { RedactorService} from '@app/modules/redactor/services/redactor.service';
import { TaskResolverService} from '@app/modules/redactor/services/task-resolver.service';
import { reducers} from '@app/modules/redactor/reducers/index.reducer';
import {StoreModule} from '@ngrx/store';
import { EffectsModule} from '@ngrx/effects';
import { RedactorEffects} from '@app/modules/redactor/effects/redactor.effect';
import { MaterialModule} from '@app/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ContentLoaderModule } from '@netbasal/content-loader';
import { UpdateDialogParentComponent } from './containers/update-dialog-parent/update-dialog-parent.component';

@NgModule({
  declarations: [routedComponents, UpdateDialogParentComponent],
  imports: [
    CommonModule,
    RedactorRoutingModule,
    StoreModule.forFeature('redactor', reducers),
    EffectsModule.forFeature([RedactorEffects]),
    MaterialModule,
    FlexLayoutModule,
    NgxDatatableModule,
    ContentLoaderModule
  ],
  providers: [RedactorService, TaskResolverService],
  entryComponents: [UpdateDialogParentComponent]
})
export class RedactorModule { }
