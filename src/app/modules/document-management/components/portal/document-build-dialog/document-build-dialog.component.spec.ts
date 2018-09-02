import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentBuildDialogComponent } from './document-build-dialog.component';

describe('DocumentBuildDialogComponent', () => {
  let component: DocumentBuildDialogComponent;
  let fixture: ComponentFixture<DocumentBuildDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentBuildDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentBuildDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
