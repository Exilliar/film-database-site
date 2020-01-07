import { Component, OnInit, ViewChild } from '@angular/core';
import {
    MatTableDataSource,
    MatSnackBar,
    MatSnackBarConfig,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
    MatSort,
    MatSnackBarRef
} from '@angular/material';

import { ActivatedRoute } from '@angular/router';

import { Film } from 'src/app/models/film.model';

import { FilmDataService } from 'src/app/services/film-data/film-data.service';

@Component({
  selector: 'app-view-table',
  templateUrl: './view-table.component.html',
  styleUrls: ['./view-table.component.scss']
})
export class ViewTableComponent implements OnInit {

  constructor(
    private filmDataService: FilmDataService,
    private snackBar: MatSnackBar,

    private route: ActivatedRoute,
  ) { }

  displayedColumns: string[] = ['id', 'name', 'length', 'watched'];

  dataSource: MatTableDataSource<unknown> = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;

  user: Object = null;
  role: number = null;

  totalFilms: number = null;

  admin: boolean = false;

  uid: string;

  isLoading: boolean = true;
  offline: boolean = false;

  removeToggle: boolean = false; // If false then remove buttons are not shown and film watched can be updated, opposite if true

  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get("uid");

    console.log("uid:", this.uid);

    this.getFilms(false);
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getFilms(userFailed: boolean): void {
    const userFailedMessage: string = "Error getting user, if you're an admin you will not have the privileges in this session. Refresh the page to try again.";
    this.filmDataService.getData(this.uid)
    .subscribe(res => { // If the user is connected to the internet
        res = this.sortById(res);

        this.dataSource.data = this.addDisplayID(res);
        this.isLoading = false;
        this.totalFilms = res.length;

        localStorage.setItem("films", JSON.stringify(res));

        if (userFailed) this.openSnackbar([userFailedMessage]);
      }, err => { // Assumed that the user is not connected to the internet
        console.log(err);
        const adminMessage: string = this.admin ? ' For admins, admin features will not work.' : ''; // this will only work if the get user call comes in before this one fails which is unlikely, but it's still kinda nice to have
        const message: string = "Could not get table data, loading data from cache." + adminMessage;

        userFailed === true ? this.openSnackbar([userFailedMessage, message]) : this.openSnackbar([message]);

        this.offline = true;

        this.dataSource.data = JSON.parse(localStorage.getItem("films"));
        this.isLoading = false;
        this.totalFilms = this.dataSource.data.length;
      }
    );
  }

  addDisplayID(res: Film[]) : Film[] {
    for(let i = 0; i < res.length; i++) {
      res[i].displayId = i+1;
    }

    return res;
  }

  sortById(data: Film[]): Film[] { // Very basic sort, probably already a built in function to do this
    let placeholder: Film;

    for (let y = 0; y < data.length; y++) {
      for (let x = y; x < data.length; x++) {
        if (data[y].id > data[x].id) {
          placeholder = data[y];
          data[y] = data[x];
          data[x] = placeholder;
        }
      }
    }

    return data;
  }

  openSnackbar(message: string[]): void {
    const actionButtonLabel: string = 'Okay';
    const horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    const verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    let config = new MatSnackBarConfig();
    config.verticalPosition = verticalPosition;
    config.horizontalPosition = horizontalPosition;
    config.duration = 5000;

    const snackBarRef: MatSnackBarRef<unknown> = this.snackBar.open(message[0], actionButtonLabel, config);

    if (message.length > 1) {
      snackBarRef.afterDismissed().subscribe(() => {
        this.snackBar.open(message[1], actionButtonLabel, config);
      });
    }
  }

}
