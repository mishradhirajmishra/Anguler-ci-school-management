import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllGuardianComponent } from './all-guardian.component';

describe('AllGuardianComponent', () => {
  let component: AllGuardianComponent;
  let fixture: ComponentFixture<AllGuardianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllGuardianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllGuardianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
