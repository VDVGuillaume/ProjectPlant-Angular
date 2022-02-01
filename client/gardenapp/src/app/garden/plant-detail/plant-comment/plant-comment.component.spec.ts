import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantCommentComponent } from './plant-comment.component';

describe('PlantCommentComponent', () => {
  let component: PlantCommentComponent;
  let fixture: ComponentFixture<PlantCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
