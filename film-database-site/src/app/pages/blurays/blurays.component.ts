import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-blurays',
  templateUrl: './blurays.component.html',
  styleUrls: ['./blurays.component.less']
})
export class BluraysComponent implements OnInit {

  constructor(
    private dataservice: DataServiceService
  ) { }

  title = 'film-database-site';

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