import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule} from './../material/material.module'
import { PlantTableComponent } from './plant-table/plant-table.component';
import { AddPlantComponent } from './add-plant/add-plant.component';
import { PlantFilterPipe } from './plant-filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { PlantDetailComponent } from './plant-detail/plant-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { PlantResolver } from './PlantResolver';
import { PlantCommentComponent } from './plant-detail/plant-comment/plant-comment.component';

const routes : Routes = [
  { path: 'table', component: PlantTableComponent },
  { path: 'add', component: AddPlantComponent },  
  { path: 'detail/:id',  component: PlantDetailComponent,
      resolve: { plant: PlantResolver }
  }
];


@NgModule({
  declarations: [    
    
    PlantTableComponent, 
    AddPlantComponent,
    PlantFilterPipe,
    PlantDetailComponent,
    PlantCommentComponent
    ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,

    RouterModule.forChild(routes)

  ],
  exports: [
    PlantTableComponent,
    AddPlantComponent
  ],
})
export class GardenModule { }
