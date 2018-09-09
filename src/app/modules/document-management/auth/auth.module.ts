import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { MaterialModule} from '@app/material';
import { AuthRoutingModule, routedComponents } from './auth-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthGuardLogInPageService } from './services/auth-guard-login-page.service';
import { AuthEffects } from './effects/auth.effects';
import { reducers } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AuthRoutingModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: [routedComponents],
  providers: [AuthGuardService, AuthGuardLogInPageService]
})
export class AuthModule { }
