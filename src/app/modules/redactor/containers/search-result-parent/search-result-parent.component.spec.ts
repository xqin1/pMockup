import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultParentComponent } from './search-result-parent.component';

describe('SearchResultParentComponent', () => {
  let component: SearchResultParentComponent;
  let fixture: ComponentFixture<SearchResultParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
