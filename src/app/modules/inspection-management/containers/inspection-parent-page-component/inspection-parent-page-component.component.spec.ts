import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionParentPageComponentComponent } from './inspection-parent-page-component.component';



describe('InspectionParentPageComponentComponent', () => {
  let component: InspectionParentPageComponentComponent;
  let fixture: ComponentFixture<InspectionParentPageComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionParentPageComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionParentPageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
