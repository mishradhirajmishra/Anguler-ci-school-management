import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceAnalysisComponent } from './attendance-analysis.component';

describe('AttendanceAnalysisComponent', () => {
  let component: AttendanceAnalysisComponent;
  let fixture: ComponentFixture<AttendanceAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
