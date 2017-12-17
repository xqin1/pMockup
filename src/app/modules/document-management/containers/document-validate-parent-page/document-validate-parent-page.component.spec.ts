import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentValidateParentPageComponent } from './document-validate-parent-page.component';

describe('DocumentValidateParentPageComponent', () => {
  let component: DocumentValidateParentPageComponent;
  let fixture: ComponentFixture<DocumentValidateParentPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentValidateParentPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentValidateParentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
