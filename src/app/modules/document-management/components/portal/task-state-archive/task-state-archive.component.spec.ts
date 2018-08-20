import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskStateArchiveComponent } from './task-state-archive.component';

describe('TaskStateArchiveComponent', () => {
  let component: TaskStateArchiveComponent;
  let fixture: ComponentFixture<TaskStateArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskStateArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskStateArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
