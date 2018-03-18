import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentEligibilityComponent } from './document-eligibility.component';

describe('DocumentEligibilityComponent', () => {
  let component: DocumentEligibilityComponent;
  let fixture: ComponentFixture<DocumentEligibilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentEligibilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentEligibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
