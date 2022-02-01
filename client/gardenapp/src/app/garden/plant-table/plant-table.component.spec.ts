import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantTableComponent } from './plant-table.component';

describe('PlantTableComponent', () => {
  let component: PlantTableComponent;
  let fixture: ComponentFixture<PlantTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
