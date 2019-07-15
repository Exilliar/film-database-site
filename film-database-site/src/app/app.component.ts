import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { AuthService } from './auth/auth.service';
import { UserService } from './auth/user.service';
import { Router, NavigationEnd } from "@angular/router";

import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { ThemeService } from './core/services/theme.service';

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
    private themeService: ThemeService,
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd && !this.urlBlacklist.includes(router.url)) {
        this.checkSignedIn();
      }
    })
  }

  urlBlacklist = ['/login','/register'] // list of urls that the user will not be on if they are logged in (pages where sign out button will not be visible)

  title = 'film-database-site';

  ver = environment.version;

  displayedColumns: string[] = ['id', 'name', 'length', 'watched'];

  dataSource = new MatTableDataSource();

  signedIn = false;

  isDarkTheme: Observable<boolean>;
  
  ngOnInit(){
    this.checkSignedIn();
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  toggleDarkTheme(checked: boolean) {
    console.log("toggle");
    this.themeService.setDarkTheme(checked);
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
