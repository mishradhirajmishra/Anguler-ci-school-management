import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeSummeryComponent } from './fee-summery.component';

describe('FeeSummeryComponent', () => {
  let component: FeeSummeryComponent;
  let fixture: ComponentFixture<FeeSummeryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeeSummeryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeSummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
