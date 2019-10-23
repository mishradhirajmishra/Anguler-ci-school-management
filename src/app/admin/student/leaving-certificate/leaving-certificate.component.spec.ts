import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavingCertificateComponent } from './leaving-certificate.component';

describe('LeavingCertificateComponent', () => {
  let component: LeavingCertificateComponent;
  let fixture: ComponentFixture<LeavingCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeavingCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavingCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
