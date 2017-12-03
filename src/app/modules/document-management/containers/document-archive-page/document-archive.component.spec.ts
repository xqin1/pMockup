import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentArchiveComponent } from './document-archive.component';

describe('DocumentArchiveComponent', () => {
  let component: DocumentArchiveComponent;
  let fixture: ComponentFixture<DocumentArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
