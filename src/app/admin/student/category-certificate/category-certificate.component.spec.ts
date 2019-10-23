import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCertificateComponent } from './category-certificate.component';

describe('CategoryCertificateComponent', () => {
  let component: CategoryCertificateComponent;
  let fixture: ComponentFixture<CategoryCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
