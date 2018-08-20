import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskStateBuildComponent } from './task-state-build.component';

describe('TaskStateBuildComponent', () => {
  let component: TaskStateBuildComponent;
  let fixture: ComponentFixture<TaskStateBuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskStateBuildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskStateBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
