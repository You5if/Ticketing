import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnownClientComponent } from './known-client.component';

describe('KnownClientComponent', () => {
  let component: KnownClientComponent;
  let fixture: ComponentFixture<KnownClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnownClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnownClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
