import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BluraysPageComponent } from './blurays-page.component';

describe('BluraysPageComponent', () => {
  let component: BluraysPageComponent;
  let fixture: ComponentFixture<BluraysPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BluraysPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BluraysPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
