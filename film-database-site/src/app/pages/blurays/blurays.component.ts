import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSort, } from '@angular/material';

import { DataServiceService } from 'src/app/services/data-service.service';
import { UserService } from '../../auth/user/user.service';

import {MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { AddFilmDialogComponent } from './../../components/add-film-dialog/add-film-dialog.component';

import { AdminService } from '../../core/services/admin/admin.service';

import { Data } from '../../models/data.model';

export interface DialogData {
  name: string;
  length: number;
  watched: boolean;
}

@Component({
  selector: 'app-blurays',
  templateUrl: './blurays.component.html',
  styleUrls: ['./blurays.component.scss']
})
export class BluraysComponent implements OnInit {

  constructor(
    private dataservice: DataServiceService,
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private adminService: AdminService,
  ) { }

  displayedColumns: string[] = ['id', 'name', 'length', 'watched'];

  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;

  user = null;
  role = null;

  totalFilms: number = null;

  admin: boolean = false;

  isLoading: boolean = true;
  offline: boolean = false;

  ngOnInit(){
    this.userService.getCurrentUser()
    .then((user) => {
      this.dataservice.getUser(user.uid)
      .subscribe(res => {
        this.user = res;
        this.role = this.user.role;
        if (this.role === 2) {
          this.displayedColumns.push('removeFilm');
          this.admin = true;
          this.adminService.setAdmin(true);
        }

        this.getFilms(false);
      }, err => {
        this.getFilms(true);
      });
    })
    .catch(() => {
      console.log("error getting user");
    });

    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateWatched(name){
    if (this.admin) {
      if (confirm("Are you sure you want to flip watched value of " + name + "?")) {
        this.dataservice.updateWatched(name)
        .subscribe(res => {
          this.getFilms(false);
        }, err => {
          console.log(err);
        })
      }
    }
  }

  getFilms(userFailed: boolean) {
    const userFailedMessage = "Error getting user, if you're an admin you will not have the privileges in this session. Refresh the page to try again.";
    this.dataservice.getData()
    .subscribe(res => { // If the user is connected to the internet
        res = this.sortById(res);

        this.dataSource.data = res;
        this.isLoading = false;
        this.totalFilms = res.length;

        localStorage.setItem("films", JSON.stringify(res));

        if (userFailed) this.openSnackbar([userFailedMessage]);
      }, err => { // Assumed that the user is not connected to the internet
        console.log(err);
        const adminMessage: string = this.admin ? ' For admins, adding and removing films will not work.' : ''; // this will only work if the get user call comes in before this one fails which is unlikely, but it's still kinda nice to have
        const message: string = "Could not get table data, loading data from cache." + adminMessage;

        userFailed === true ? this.openSnackbar([userFailedMessage, message]) : this.openSnackbar([message]);

        this.offline = true;

        this.dataSource.data = JSON.parse(localStorage.getItem("films"));
        this.isLoading = false;
        this.totalFilms = this.dataSource.data.length;
      }
    )
  }

  sortById(data: Data[]): Data[] { // Very basic sort, probably already a built in function to do this
    let placeholder: Data;

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

  openSnackbar(message: string[]) {
    const actionButtonLabel: string = 'Okay';
    const horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    const verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    let config = new MatSnackBarConfig();
    config.verticalPosition = verticalPosition;
    config.horizontalPosition = horizontalPosition;
    config.duration = 5000;

    const snackBarRef = this.snackBar.open(message[0], actionButtonLabel, config);

    if (message.length > 1) {
      snackBarRef.afterDismissed().subscribe(() => {
        this.snackBar.open(message[1], actionButtonLabel, config);
      })
    }
  }

  addFilm() {
    let name, len, watched;

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      name: name,
      length: len,
      watched: watched
    }

    const dialogRef = this.dialog.open(AddFilmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.dataservice.addFilm(data)
          .subscribe(
            () => {
              this.getFilms(false);
            }
          );
        }
      }
    )
  }

  removeFilm(id) {
    if (confirm("Are you sure you want to delete this film?")){
      this.dataservice.removeFilm(id).subscribe(
        () => {
          this.getFilms(false);
        }
      );
    }
  }
}