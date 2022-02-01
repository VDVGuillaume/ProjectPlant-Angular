import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { GardenDataService } from '../garden-data.service';
import { Plant } from '../plant.model';
import { BehaviorSubject, EMPTY, Observable, Subject } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-plant-table',
  templateUrl: './plant-table.component.html',
  styleUrls: ['./plant-table.component.sass'],

})



export class PlantTableComponent implements OnInit {

  displayedColumns: string[] = [ 'name', 'border','datePlanted','bloomFrom','bloomTill','winterGreen',
  'colorFlower','colorLeaves','maxHeight','maxWidth','deletePlant','detailPlant'];
  dataSource = new MatTableDataSource<Plant>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  private filterPlantName : string = '';
  public filterPlant$ = new Subject<string>(); 
  private _fetchPlants$: Observable<Plant[]>

  errorMessage: string ='';

  constructor(private _gardenDataService : GardenDataService,
    private _router: Router,
    private _route: ActivatedRoute )  {

      this.filterPlant$
      .pipe(distinctUntilChanged(), debounceTime(250))
      .subscribe((val) => {
        const params = val ? { queryParams: { filter: val } } : undefined;
        this._router.navigate(['/garden/table'], params);
      });

    this._fetchPlants$ = this._route.queryParams
      .pipe(
        switchMap((newParams) => {
          // set the value of the input field with the url parameter as well
          if (newParams['filter']) {
            this.filterPlantName = newParams['filter'];
          }
          // when the queryparameter changes, take the filter parameter and use it to ask
          // the service for all recipes with this filter in their name
          // this._recipeDataService.getRecipes$(params['filter']).subscribe(
          return this._gardenDataService.getPlants$(newParams['filter']);
        })
      )
      .pipe(
        catchError((err) => {
          this.errorMessage = err;
          return EMPTY;
        })
      );

    }

  ngOnInit(): void {
    this._fetchPlants$.subscribe(
      plants => {
        this.dataSource.data = plants;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }
 


  deletePlant(plant : Plant){
    this._gardenDataService.deletePlant(plant)  

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}

