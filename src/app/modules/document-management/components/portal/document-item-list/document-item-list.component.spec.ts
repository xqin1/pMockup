import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentItemListComponent } from './document-item-list.component';

describe('DocumentItemListComponent', () => {
  let component: DocumentItemListComponent;
  let fixture: ComponentFixture<DocumentItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
