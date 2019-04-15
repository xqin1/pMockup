import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedactorRoutingModule, routedComponents } from '@app/modules/redactor/redactor-routing.module';
import { HeaderParentComponent } from './containers/header-parent/header-parent.component';
import { SearchParentComponent } from './containers/search-parent/search-parent.component';
import { SearchResultParentComponent } from './containers/search-result-parent/search-result-parent.component';
import { SelectionParentComponent } from './containers/selection-parent/selection-parent.component';
import { SearchComponent } from './components/search/search.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SelectionComponent } from './components/selection/selection.component';
import { RedactorService} from '@app/modules/redactor/services/redactor.service';;
import { TaskResolverService} from '@app/modules/redactor/services/task-resolver.service';
import { reducers} from '@app/modules/redactor/reducers/index.reducer';
import {StoreModule} from '@ngrx/store';
import { EffectsModule} from '@ngrx/effects';
import { RedactorEffects} from '@app/modules/redactor/effects/redactor.effect';
import { MaterialModule} from '@app/material';
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  declarations: [routedComponents, HeaderParentComponent, SearchParentComponent, SearchResultParentComponent, SelectionParentComponent, SearchComponent, HeaderComponent, SearchResultComponent, SelectionComponent],
  imports: [
    CommonModule,
    RedactorRoutingModule,
    StoreModule.forFeature('redactor', reducers),
    EffectsModule.forFeature([RedactorEffects]),
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [RedactorService, TaskResolverService]
})
export class RedactorModule { }
