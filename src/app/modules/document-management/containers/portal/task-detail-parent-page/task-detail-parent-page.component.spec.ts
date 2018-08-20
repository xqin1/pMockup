import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailParentPageComponent } from './task-detail-parent-page.component';

describe('TaskDetailParentPageComponent', () => {
  let component: TaskDetailParentPageComponent;
  let fixture: ComponentFixture<TaskDetailParentPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskDetailParentPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailParentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
