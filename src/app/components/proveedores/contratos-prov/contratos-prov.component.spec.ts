import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratosProvComponent } from './contratos-prov.component';

describe('ContratosProvComponent', () => {
  let component: ContratosProvComponent;
  let fixture: ComponentFixture<ContratosProvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratosProvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratosProvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
