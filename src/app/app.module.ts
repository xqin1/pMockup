import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import {HttpClientModule} from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './reducers';
import { environment } from '@env/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PEFService} from '@app/core/services/pef.service';
import { DMService} from '@app/core/services/dm.service';

import { ContentLoaderModule } from '@netbasal/content-loader';
import { CookieModule} from 'ngx-cookie';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    AppRoutingModule,
    ContentLoaderModule,
    CookieModule.forRoot(),

    StoreModule.forRoot(reducers, { metaReducers }),

    StoreRouterConnectingModule.forRoot({
      stateKey: "router"
    }),

    StoreDevtoolsModule.instrument({
      name: 'Document Management Store DevTools',
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
  ],
  providers: [
    PEFService,
    DMService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
