import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertficateEmployeeComponent } from './certficate-employee.component';

describe('CertficateEmployeeComponent', () => {
  let component: CertficateEmployeeComponent;
  let fixture: ComponentFixture<CertficateEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertficateEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertficateEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
