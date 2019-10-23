import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuDetailComponent } from './su-detail.component';

describe('SuDetailComponent', () => {
  let component: SuDetailComponent;
  let fixture: ComponentFixture<SuDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
