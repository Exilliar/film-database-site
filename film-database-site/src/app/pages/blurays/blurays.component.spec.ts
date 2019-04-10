import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BluraysComponent } from './blurays.component';

describe('BluraysComponent', () => {
  let component: BluraysComponent;
  let fixture: ComponentFixture<BluraysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BluraysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BluraysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
