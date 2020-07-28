import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoProvDetalleComponent } from './contrato-prov-detalle.component';

describe('ContratoProvDetalleComponent', () => {
  let component: ContratoProvDetalleComponent;
  let fixture: ComponentFixture<ContratoProvDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratoProvDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoProvDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
