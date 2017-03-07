import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
// import { SidenavComponent } from './sidenav/sidenav.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Drug Exchange';
  loggedIn = false;

  constructor(
    private api: ApiService,
    private router: Router
  ) {
  }

  logout(){
    this.api.logout();
    // this.router.navigateByUrl('/login');
  }
}
