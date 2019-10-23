import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpEmployeeComponent } from './exp-employee.component';

describe('ExpEmployeeComponent', () => {
  let component: ExpEmployeeComponent;
  let fixture: ComponentFixture<ExpEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
