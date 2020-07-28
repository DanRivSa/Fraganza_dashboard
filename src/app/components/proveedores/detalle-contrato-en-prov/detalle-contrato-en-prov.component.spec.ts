import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleContratoEnProvComponent } from './detalle-contrato-en-prov.component';

describe('DetalleContratoEnProvComponent', () => {
  let component: DetalleContratoEnProvComponent;
  let fixture: ComponentFixture<DetalleContratoEnProvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleContratoEnProvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleContratoEnProvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
