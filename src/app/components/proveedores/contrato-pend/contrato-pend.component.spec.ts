import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoPendComponent } from './contrato-pend.component';

describe('ContratoPendComponent', () => {
  let component: ContratoPendComponent;
  let fixture: ComponentFixture<ContratoPendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratoPendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoPendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
