import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoProdComponent } from './contrato-prod.component';

describe('ContratoProdComponent', () => {
  let component: ContratoProdComponent;
  let fixture: ComponentFixture<ContratoProdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratoProdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
