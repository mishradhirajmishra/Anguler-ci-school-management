import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterCertificateComponent } from './character-certificate.component';

describe('CharacterCertificateComponent', () => {
  let component: CharacterCertificateComponent;
  let fixture: ComponentFixture<CharacterCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
