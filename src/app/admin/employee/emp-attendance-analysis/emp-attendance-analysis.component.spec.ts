import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpAttendanceAnalysisComponent } from './emp-attendance-analysis.component';

describe('EmpAttendanceAnalysisComponent', () => {
  let component: EmpAttendanceAnalysisComponent;
  let fixture: ComponentFixture<EmpAttendanceAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpAttendanceAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpAttendanceAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
