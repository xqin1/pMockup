import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedactorParentComponent } from './redactor-parent.component';

describe('RedactorParentComponent', () => {
  let component: RedactorParentComponent;
  let fixture: ComponentFixture<RedactorParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedactorParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedactorParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
