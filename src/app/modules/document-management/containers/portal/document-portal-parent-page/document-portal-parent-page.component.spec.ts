import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPortalParentPageComponent } from './document-portal-parent-page.component';

describe('DocumentPortalParentPageComponent', () => {
  let component: DocumentPortalParentPageComponent;
  let fixture: ComponentFixture<DocumentPortalParentPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentPortalParentPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentPortalParentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
