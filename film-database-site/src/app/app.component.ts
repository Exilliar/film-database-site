import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { AuthService } from './auth/auth.service';
import { UserService } from './auth/user.service';
import { Router, NavigationEnd } from "@angular/router";

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd && !this.urlBlacklist.includes(router.url)) {
        this.checkSignedIn();
      }
    })
  }

  urlBlacklist = ['/login','/register'] // list of urls that the user will not be on if they are logged in

  title = 'film-database-site';

  ver = environment.version;

  displayedColumns: string[] = ['id', 'name', 'length', 'watched'];

  dataSource = new MatTableDataSource();

  signedIn = false;
  
  ngOnInit(){
    this.checkSignedIn();
  }
  
  checkSignedIn(){
    this.userService.getCurrentUser()
    .then(() => {
      this.signedIn = true;
    })
    .catch(() => {
      this.signedIn = false;
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRowClicked(row)
  {
    console.log('Row clicked:',row);
  }

  signOut() {
    this.signedIn = false;

    this.authService.SignOut()
    .then(() => {
      this.router.navigate(['/login']);
    })
  }
}
