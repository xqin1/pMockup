import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDialogParentComponent } from './update-dialog-parent.component';

describe('UpdateDialogParentComponent', () => {
  let component: UpdateDialogParentComponent;
  let fixture: ComponentFixture<UpdateDialogParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDialogParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDialogParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
