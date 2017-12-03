import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotherInspectionFormComponent } from './another-inspection-form.component';

describe('AnotherInspectionFormComponent', () => {
  let component: AnotherInspectionFormComponent;
  let fixture: ComponentFixture<AnotherInspectionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnotherInspectionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnotherInspectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
