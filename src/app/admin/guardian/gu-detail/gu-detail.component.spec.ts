import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuDetailComponent } from './gu-detail.component';

describe('GuDetailComponent', () => {
  let component: GuDetailComponent;
  let fixture: ComponentFixture<GuDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
