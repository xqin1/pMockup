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

@NgModule({
  declarations: [routedComponents, HeaderParentComponent, SearchParentComponent, SearchResultParentComponent, SelectionParentComponent, SearchComponent, HeaderComponent, SearchResultComponent, SelectionComponent],
  imports: [
    CommonModule,
    RedactorRoutingModule,
  ]
})
export class RedactorModule { }
