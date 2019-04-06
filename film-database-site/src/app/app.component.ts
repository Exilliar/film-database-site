import { Component,ViewChild, AfterViewInit } from '@angular/core';
import { MatSort, MatPaginator } from '@angular/material'

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
export class AppComponent {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  title = 'film-database-site';

  displayedColumns: string[] = ['position', 'name', 'length', 'watched'];

  dataSource = ELEMENT_DATA;
  
  onRowClicked(row)
  {
    console.log('Row clicked:',row);
  }
}
