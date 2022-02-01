import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GardenDataService } from '../garden-data.service';
import { Plant } from '../plant.model';
import { formatDate } from '@angular/common';
import { combineLatest, EMPTY, Observable, of, Subject } from 'rxjs';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-plant-detail',
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.sass']
})
export class PlantDetailComponent implements OnInit, OnDestroy {

  public plant : Plant;
  public observablePlant : Observable<Plant>;
  public form: FormGroup;
  public errorMessage: string = '';
  public confirmationMessage: string = '';
  public isEditing : boolean = false;
  public currentDate : Date = new Date();
  public months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
  
  private destroy$ = new Subject<boolean>();

  constructor(private route: ActivatedRoute, private router : Router, private _gardenDataService: GardenDataService, private fb: FormBuilder) { }
  

  ngOnInit(): void {
  

    this.setPlant();

  // this.route.paramMap.subscribe(
  //    pa=> this._gardenDataService.getPlant$(pa.get('id'))
  //    .subscribe(plant => this.plant = plant)
  //    );     
     
  }


  private setPlant() {
    const id$ = this.route.paramMap.pipe(map(params => params.get('id')));
    const refresh$ = this._gardenDataService.reloadPlants$;

    combineLatest([id$, refresh$]).pipe(
      switchMap(([id, _]) => this._gardenDataService.getPlant$(id)), 
      takeUntil(this.destroy$)
    ).subscribe(plant => this.plant = plant);
  }

  checkWinterGreen(e){
    this.form.get('winterGreen').setValue(e.checked);
  }

  changeBloomFrom(e) {
    this.form.get('bloomFrom').setValue(e.target.value,{
      onlySelf : true
    })
  }

  changeBloomTill(e){
    this.form.get('bloomTill').setValue(e.target.value,{
      onlySelf : true
    })
  }

  getErrorMessage(errors: any): string {
    if (errors.required) {
      return 'is required';
    } else if (errors.minlength) {
      return `needs at least ${errors.minlength.requiredLength} 
        characters (got ${errors.minlength.actualLength})`;
    }
    return ''
  }


  editPlant(){
    this.isEditing = true;
    this.form = this.fb.group({
      name:[this.plant.name],
      datePlanted: [formatDate(this.plant.datePlanted,'yyyy-MM-dd','en')], 
      border:[this.plant.border],
      bloomFrom:[this.plant.bloomFrom],
      bloomTill:[this.plant.bloomTill],
      winterGreen:[this.plant.winterGreen],
      colorFlower:[this.plant.colorFlower],
      colorLeaves:[this.plant.colorLeaves],
      maxHeight:[this.plant.maxHeight],
      maxWidth:[this.plant.maxWidth],
      })
  }


  onUpdate() {
    
    this.plant.datePlanted = this.form.value.datePlanted;
    this.plant.border = this.form.value.border;
    this.plant.bloomFrom = this.form.value.bloomFrom,
    this.plant.bloomTill = this.form.value.bloomTill,
    this.plant.winterGreen = this.form.value.winterGreen,
    this.plant.colorFlower = this.form.value.colorFlower,
    this.plant.colorLeaves = this.form.value.colorLeaves,
    this.plant.maxHeight = this.form.value.maxHeight,
    this.plant.maxWidth = this.form.value.maxWidth


    this._gardenDataService
    .updatePlant(
    
    this.plant 
    )
    .pipe(
      catchError((err) => {
        this.errorMessage = err;
        return EMPTY;
      })
    )
    .subscribe((plant : Plant) => {
      this.confirmationMessage = `${plant.name} was successfully updated`;
    });

    this.isEditing = false;

  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  
}
