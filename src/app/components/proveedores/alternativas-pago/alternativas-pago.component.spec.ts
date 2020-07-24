import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternativasPagoComponent } from './alternativas-pago.component';

describe('AlternativasPagoComponent', () => {
  let component: AlternativasPagoComponent;
  let fixture: ComponentFixture<AlternativasPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlternativasPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlternativasPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
