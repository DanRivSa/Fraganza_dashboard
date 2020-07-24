import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionInicialComponent } from './evaluacion-inicial.component';

describe('EvaluacionInicialComponent', () => {
  let component: EvaluacionInicialComponent;
  let fixture: ComponentFixture<EvaluacionInicialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluacionInicialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
