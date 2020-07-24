import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarContratosComponent } from './mostrar-contratos.component';

describe('MostrarContratosComponent', () => {
  let component: MostrarContratosComponent;
  let fixture: ComponentFixture<MostrarContratosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarContratosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarContratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
