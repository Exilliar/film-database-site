import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material'

export interface data {
  position: number;
  name: string;
  length: number;
  watched: boolean;
}

export const ELEMENT_DATA: data[] = [{position:1,name:'film 1',length:100,watched:true},
                              {position:2,name:'film 2',length:100,watched:true},
                              {position:3,name:'film 3',length:100,watched:true},
                              {position:4,name:'film 4',length:100,watched:true},
                              {position:5,name:'film 5',length:100,watched:true},
                              {position:6,name:'film 6',length:100,watched:true}
                            ];




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{

  title = 'film-database-site';

  displayedColumns: string[] = ['position', 'name', 'length', 'watched'];

  dataSource = new MatTableDataSource(ELEMENT_DATA);
  
  ngOnInit(){
    
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRowClicked(row)
  {
    console.log('Row clicked:',row);
  }
}
