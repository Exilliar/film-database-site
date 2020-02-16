import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTablePageComponent } from './view-table-page.component';

describe('ViewTablePageComponent', () => {
  let component: ViewTablePageComponent;
  let fixture: ComponentFixture<ViewTablePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTablePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
