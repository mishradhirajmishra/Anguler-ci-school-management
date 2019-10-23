import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFeePayComponent } from './student-fee-pay.component';

describe('StudentFeePayComponent', () => {
  let component: StudentFeePayComponent;
  let fixture: ComponentFixture<StudentFeePayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentFeePayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentFeePayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
