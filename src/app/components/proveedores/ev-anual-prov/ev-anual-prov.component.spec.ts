import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvAnualProvComponent } from './ev-anual-prov.component';

describe('EvAnualProvComponent', () => {
  let component: EvAnualProvComponent;
  let fixture: ComponentFixture<EvAnualProvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvAnualProvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvAnualProvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
