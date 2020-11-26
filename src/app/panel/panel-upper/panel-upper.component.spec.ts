import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelUpperComponent } from './panel-upper.component';

describe('PanelUpperComponent', () => {
  let component: PanelUpperComponent;
  let fixture: ComponentFixture<PanelUpperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelUpperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelUpperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
