import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { GardenDataService } from "./garden-data.service";
import { Plant } from "./plant.model";

@Injectable({
    providedIn: 'root'
  })
  export class PlantResolver implements Resolve<Plant> {
  
  constructor(private gardenDataService : GardenDataService){

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Plant>  {

      return this.gardenDataService.getPlant$(route.params['id']);

    }
   
    
  }