import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListParentPageComponent } from './task-list-parent-page.component';

describe('TaskListParentPageComponent', () => {
  let component: TaskListParentPageComponent;
  let fixture: ComponentFixture<TaskListParentPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskListParentPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListParentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
