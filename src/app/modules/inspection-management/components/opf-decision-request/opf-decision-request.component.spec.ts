import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpfDecisionRequestComponent } from './opf-decision-request.component';

describe('OpfDecisionRequestComponent', () => {
  let component: OpfDecisionRequestComponent;
  let fixture: ComponentFixture<OpfDecisionRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpfDecisionRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpfDecisionRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
