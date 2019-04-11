import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionParentComponent } from './selection-parent.component';

describe('SelectionParentComponent', () => {
  let component: SelectionParentComponent;
  let fixture: ComponentFixture<SelectionParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
