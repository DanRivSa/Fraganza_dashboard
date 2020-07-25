import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoProduComponent } from './contrato-produ.component';

describe('ContratoProduComponent', () => {
  let component: ContratoProduComponent;
  let fixture: ComponentFixture<ContratoProduComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratoProduComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoProduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
