import { Injectable } from '@angular/core';
import { Plant } from './plant.model';
import { Comment } from './comment.model';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GardenDataService {

  private _reloadPlants$ = new BehaviorSubject<boolean>(true);
  public reloadPlants$ = this._reloadPlants$.asObservable();
  


  constructor(private http: HttpClient) { 
    
  }

  getPlants$(name?: string, dateAdded?: string) {
    return this._reloadPlants$.pipe(
      switchMap(() => this.fetchPlants$(name, dateAdded))
    );
  }


  fetchPlants$(name?: string, dateAdded?: string) {
    let params = new HttpParams();
    params = name? params.append('name', name) : params;
    params = dateAdded ? params.append('dateAdded', dateAdded) : params;
    return this.http.get(`${environment.apiUrl}/garden/`, { params }).pipe(
      catchError(this.handleError),
      map((list: any[]): Plant[] => list.map(Plant.fromJSON))
    );
  }
 
  
  getPlant$(id: string): Observable<Plant> {
    return this.http
      .get(`${environment.apiUrl}/garden/${id}`)
      .pipe(catchError(this.handleError), map(Plant.fromJSON)); // returns just one recipe, as json
  }

  handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err instanceof HttpErrorResponse) {
      errorMessage = `'${err.status} ${err.statusText}' when accessing '${err.url}'`;
    } else {
      console.log(err);
      errorMessage = `an unknown error occurred ${err}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  addNewPlant(plant : Plant) {
    return this.http
    .post(`${environment.apiUrl}/garden/`, plant.toJSON())
    .pipe(catchError(this.handleError), map(Plant.fromJSON))
    .pipe(
      // temporary fix, while we use the behaviorsubject as a cache stream
      catchError((err) => {
        return throwError(err);
      }),
      tap((plant : Plant) => {
        this._reloadPlants$.next(true);
      })
    );
  }

  
  deletePlant(plant : Plant) {
    return this.http
      .delete(`${environment.apiUrl}/garden/${plant.id}`)
      .pipe(tap(console.log), catchError(this.handleError))
      .subscribe(() => {
        this._reloadPlants$.next(true);
      });
  }

  updatePlant(plant : Plant){
    return this.http
    .put(`${environment.apiUrl}/garden/${plant.id}`,plant.toUpdateJSON())
    .pipe(catchError(this.handleError),map(Plant.fromJSON))
    .pipe( catchError((err) => {
      return throwError(err);
    }),
    tap((plant : Plant) => {
      this._reloadPlants$.next(true);
    })
  );
  }

  addComment(comment : Comment, plant : Plant){
    return this.http
    .post(`${environment.apiUrl}/garden/${plant.id}/comments`, comment.toJSON())
    .pipe(catchError(this.handleError),map(Comment.fromJSON))
    .pipe( catchError((err) => {
      return throwError(err);
    }),
    tap((comment : Comment ) => {
      this._reloadPlants$.next(true);
    })
    );

  }

  
}
