import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskStateParentPageComponent } from './task-state-parent-page.component';

describe('TaskStateParentPageComponent', () => {
  let component: TaskStateParentPageComponent;
  let fixture: ComponentFixture<TaskStateParentPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskStateParentPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskStateParentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
