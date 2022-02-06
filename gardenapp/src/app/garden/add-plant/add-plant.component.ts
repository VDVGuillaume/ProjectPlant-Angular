import { state } from '@angular/animations';
import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GardenDataService } from '../garden-data.service';
import { Plant } from '../plant.model';

@Component({
  selector: 'app-add-plant',
  templateUrl: './add-plant.component.html',
  styleUrls: ['./add-plant.component.sass']
})
export class AddPlantComponent implements OnInit {

  @Output() public newPlant = new EventEmitter<Plant>();
  public form: FormGroup;
  public errorMessage: string = '';
  public confirmationMessage: string = '';
  public currentDate : Date = new Date();
  public months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];

  constructor(private fb: FormBuilder, private _gardenDataService : GardenDataService) { }

  ngOnInit() {
    this.form = this.fb.group({
      name:[''],
      datePlanted:[], 
      border:[''],
      bloomFrom:[''],
      bloomTill:[''],
      winterGreen:false,
      colorFlower:[],
      colorLeaves:[],
      maxHeight:[0],
      maxWidth:[0],
    })
  }


  onSubmit() {

    let plant = new Plant(this.form.value.name);
    plant.datePlanted = this.form.value.datePlanted;
    plant.border = this.form.value.border;
    plant.bloomFrom = this.form.value.bloomFrom,
    plant.bloomTill = this.form.value.bloomTill,
    plant.winterGreen = this.form.value.winterGreen,
    plant.colorFlower = this.form.value.colorFlower,
    plant.colorLeaves = this.form.value.colorLeaves,
    plant.maxHeight = this.form.value.maxHeight,
    plant.maxWidth = this.form.value.maxWidth



    this._gardenDataService
    .addNewPlant(
    
    plant
    )
    .pipe(
      catchError((err) => {
        this.errorMessage = err;
        return EMPTY;
      })
    )
    .subscribe((plant : Plant) => {
      this.confirmationMessage = `${plant.name} was successfully added`;
    });

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




}
