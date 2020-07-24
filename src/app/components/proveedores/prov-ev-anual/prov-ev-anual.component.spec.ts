import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvEvAnualComponent } from './prov-ev-anual.component';

describe('ProvEvAnualComponent', () => {
  let component: ProvEvAnualComponent;
  let fixture: ComponentFixture<ProvEvAnualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvEvAnualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvEvAnualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
