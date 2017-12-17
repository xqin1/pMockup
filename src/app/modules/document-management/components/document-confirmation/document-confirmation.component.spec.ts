import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentConfirmationComponent } from './document-confirmation.component';

describe('DocumentConfirmationComponent', () => {
  let component: DocumentConfirmationComponent;
  let fixture: ComponentFixture<DocumentConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
