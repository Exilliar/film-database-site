import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { AuthService } from 'src/app/core/services/authService/auth.service';

import { ThemeService } from 'src/app/core/services/theme/theme.service';
import { AdminService } from 'src/app/core/services/admin/admin.service';
import { SignedInService } from 'src/app/core/services/signed-in/signed-in.service';

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
  ) {  }

  title: String = 'film-database-site';

  ver: String = environment.version;

  displayedColumns: string[] = ['id', 'name', 'length', 'watched'];

  signedIn: Observable<boolean>;

  isDarkTheme: Observable<boolean>;

  isAdmin: Observable<boolean>;

  ngOnInit(): void {
    this.signedIn = this.signedInService.isSignedIn;
    this.isDarkTheme = this.themeService.isDarkTheme;
    this.isAdmin = this.adminService.isAdmin;
  }

  toggleDarkTheme(checked: boolean): void {
    this.themeService.setDarkTheme(checked);
  }

  signOut(): void {
    this.adminService.setAdmin(false);

    this.authService.SignOut()
    .then(() => {
      this.router.navigate(['/login']);
    });
  }
}
