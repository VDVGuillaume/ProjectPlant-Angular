import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from '../user/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {



  isHandset$: Observable<boolean> = this._breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private _breakpointObserver: BreakpointObserver, private _authService: AuthenticationService, private _router: Router) {}


  getUserName():String{ 
    if(this._authService.user$.getValue() != null)
      return `Hi, ${this._authService.user$.getValue()}`
    return ''
  }

  logOut(){
    this._authService.logout();
    this._router.navigate(['/login']);
  }

}
