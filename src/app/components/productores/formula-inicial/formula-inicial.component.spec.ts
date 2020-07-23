import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaInicialComponent } from './formula-inicial.component';

describe('FormulaInicialComponent', () => {
  let component: FormulaInicialComponent;
  let fixture: ComponentFixture<FormulaInicialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulaInicialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
