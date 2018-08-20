import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskStateSignComponent } from './task-state-sign.component';

describe('TaskStateSignComponent', () => {
  let component: TaskStateSignComponent;
  let fixture: ComponentFixture<TaskStateSignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskStateSignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskStateSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
