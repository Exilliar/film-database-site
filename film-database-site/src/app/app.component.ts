import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { DataServiceService } from 'src/app/services/data-service.service';
import { AuthService } from './auth/auth.service';
import { Router } from "@angular/router";

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{
  constructor(
    private dataservice: DataServiceService,
    private authService: AuthService,
    private router: Router
  ) { }

  title = 'film-database-site';

  ver = environment.version;

  displayedColumns: string[] = ['id', 'name', 'length', 'watched'];

  dataSource = new MatTableDataSource();
  
  ngOnInit(){
    
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRowClicked(row)
  {
    console.log('Row clicked:',row);
  }

  signOut() {
    this.authService.SignOut()
    .then(() => {
      this.router.navigate(['/login']);
    })
  }
}
