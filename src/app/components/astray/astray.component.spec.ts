import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AstrayComponent } from './astray.component';

describe('AstrayComponent', () => {
  let component: AstrayComponent;
  let fixture: ComponentFixture<AstrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AstrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AstrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
