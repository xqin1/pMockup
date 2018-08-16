import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPortalHeaderParentPageComponent } from './document-portal-header-parent-page.component';

describe('DocumentPortalHeaderParentPageComponent', () => {
  let component: DocumentPortalHeaderParentPageComponent;
  let fixture: ComponentFixture<DocumentPortalHeaderParentPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentPortalHeaderParentPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentPortalHeaderParentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
