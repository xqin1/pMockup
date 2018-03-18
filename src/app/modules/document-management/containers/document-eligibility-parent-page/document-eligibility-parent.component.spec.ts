import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentEligibilityParentComponent } from './document-eligibility-parent.component';

describe('DocumentEligibilityParentComponent', () => {
  let component: DocumentEligibilityParentComponent;
  let fixture: ComponentFixture<DocumentEligibilityParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentEligibilityParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentEligibilityParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
