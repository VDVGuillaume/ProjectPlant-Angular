import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Comment, CommentJson } from '../../comment.model';
import { GardenDataService } from '../../garden-data.service';
import { Plant } from '../../plant.model';

@Component({
  selector: 'app-plant-comment',
  templateUrl: './plant-comment.component.html',  
  styleUrls: ['./plant-comment.component.sass']
})
export class PlantCommentComponent implements OnInit {

  @Input() plant: Plant;  
  @Input() comments: Comment[];;
  public form: FormGroup;
  public errorMessage: string = '';
  public confirmationMessage: string = '';

  constructor(private fb: FormBuilder,private _gardenDataService: GardenDataService, private ref : ChangeDetectorRef) {     

    
  }  

  ngOnInit(): void {   

    this.form = this.fb.group({

        commentText:''
      })


  }


  onSend(){      

    
    this._gardenDataService
    .addComment(
    
      new Comment(this.form.value.commentText),this.plant
    )
    .pipe(
      catchError((err) => {
        this.errorMessage = err;
        return EMPTY;
      })
    )
    .subscribe((comment : Comment) => {
      this.confirmationMessage = `Comment was successfully added`;
    });

   

  }


}
