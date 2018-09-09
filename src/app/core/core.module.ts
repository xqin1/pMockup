import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { LoggerService } from './services/logger.service';
import { ExceptionService } from './services/exception.service';
import { OutHeaderInterceptor } from './services/out-header.interceptor';
import { UtilityService } from './services/utility.service';
import { PageNotFoundComponent} from '@app/core/components/page-not-found/page-not-found.component';
import { MaterialModule } from '../material';
import { CommonModule} from '@angular/common';


@NgModule({
  imports: [ RouterModule, FlexLayoutModule, MaterialModule, CommonModule],
  declarations: [PageNotFoundComponent],
  exports: [ FlexLayoutModule],
  providers: [
    LoggerService, ExceptionService, UtilityService,
    {provide: HTTP_INTERCEPTORS, useClass: OutHeaderInterceptor, multi: true}
  ],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
      parentModule: CoreModule,
  ) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}

