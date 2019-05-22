import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { DataServiceService } from 'src/app/services/data-service.service';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{
  constructor(
    private dataservice: DataServiceService
  ) { }

  title = 'film-database-site';

  ver = environment.version;

  displayedColumns: string[] = ['id', 'name', 'length', 'watched'];

  dataSource = new MatTableDataSource();
  
  ngOnInit(){
    this.dataservice.getData()
    .subscribe(res => {
        console.log(res);
        this.dataSource.data = res;
      }
    )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRowClicked(row)
  {
    console.log('Row clicked:',row);
  }
}
