import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material';
import { Router, NavigationEnd } from "@angular/router";

import { AuthService } from './../../auth/auth.service';

import { environment } from '../../../environments/environment';

import { ThemeService } from '../../core/services/theme/theme.service';
import { AdminService } from '../../core/services/admin/admin.service';
import { SignedInService } from '../../core/services/signed-in/signed-in.service';

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
    private themeService: ThemeService,
    private adminService: AdminService,
    private signedInService: SignedInService,
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd && !this.urlBlacklist.includes(router.url)) {
        // this.checkSignedIn();
      }
    })
  }

  urlBlacklist = ['/login','/register'] // list of urls that the user will not be on if they are logged in (pages where sign out button will not be visible)

  title = 'film-database-site';

  ver = environment.version;

  displayedColumns: string[] = ['id', 'name', 'length', 'watched'];

  dataSource = new MatTableDataSource();

  signedIn: Observable<boolean>;

  isDarkTheme: Observable<boolean>;

  isAdmin: Observable<boolean>;
  
  ngOnInit(){
    this.signedIn = this.signedInService.isSignedIn;
    this.isDarkTheme = this.themeService.isDarkTheme;
    this.isAdmin = this.adminService.isAdmin;
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
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

    this.authService.SignOut()
    .then(() => {
      this.router.navigate(['/login']);
    })
  }
}
