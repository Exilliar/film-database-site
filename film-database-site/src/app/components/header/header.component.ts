import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material';
import { Router, NavigationEnd } from "@angular/router";

import { AuthService } from './../../auth/auth.service';
import { UserService } from './../../auth/user.service';

import { environment } from '../../../environments/environment';

import { ThemeService } from './../../core/services/theme.service';
import { AdminService } from './../../core/services/admin.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private themeService: ThemeService,
    private adminService: AdminService,
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

  signedIn: boolean = false;

  isDarkTheme: Observable<boolean>;

  isAdmin: Observable<boolean>;
  
  ngOnInit(){
    this.checkSignedIn();
    
    this.isDarkTheme = this.themeService.isDarkTheme;
    this.isAdmin = this.adminService.isAdmin;
  }

  toggleDarkTheme(checked: boolean) {
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
    this.adminService.setAdmin(false);

    this.signedIn = false;

    this.authService.SignOut()
    .then(() => {
      this.router.navigate(['/login']);
    })
  }
}
