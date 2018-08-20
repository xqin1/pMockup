import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskStateConcurComponent } from './task-state-concur.component';

describe('TaskStateConcurComponent', () => {
  let component: TaskStateConcurComponent;
  let fixture: ComponentFixture<TaskStateConcurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskStateConcurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskStateConcurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
