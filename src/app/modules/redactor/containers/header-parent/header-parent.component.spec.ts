import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderParentComponent } from './header-parent.component';

describe('HeaderParentComponent', () => {
  let component: HeaderParentComponent;
  let fixture: ComponentFixture<HeaderParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
