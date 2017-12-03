import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentParentPageComponent } from './document-parent-page.component';

describe('DocumentParentPageComponent', () => {
  let component: DocumentParentPageComponent;
  let fixture: ComponentFixture<DocumentParentPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentParentPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentParentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
