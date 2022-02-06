import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PlantTableComponent} from './garden/plant-table/plant-table.component'
import { NgModule } from '@angular/core';
import { AddPlantComponent } from './garden/add-plant/add-plant.component';
import { PlantDetailComponent } from './garden/plant-detail/plant-detail.component';
import { PlantResolver } from './garden/PlantResolver';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './user/auth.guard';

const appRoutes: Routes = [
  {
    path: 'garden',
    canActivate : [AuthGuard],
    loadChildren: () => import('./garden/garden.module').then(mod => mod.GardenModule)
  },
  { path: '', redirectTo: 'garden/table', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }