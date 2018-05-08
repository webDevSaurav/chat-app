import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartingCompComponent } from './starting-comp.component';

describe('StartingCompComponent', () => {
  let component: StartingCompComponent;
  let fixture: ComponentFixture<StartingCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartingCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartingCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
