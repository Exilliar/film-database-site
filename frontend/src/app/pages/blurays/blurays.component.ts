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
import {MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

import { Film } from 'src/app/models/film.model';

import { UserService } from 'src/app/auth/userService/user.service';

import { FilmDataService } from 'src/app/services/film-data/film-data.service';
import { AdminService } from 'src/app/services/admin/admin.service';

import { AddFilmDialogComponent } from 'src/app/components/add-film-dialog/add-film-dialog.component';

@Component({
  selector: 'app-blurays',
  templateUrl: './blurays.component.html',
  styleUrls: ['./blurays.component.scss']
})
export class BluraysComponent implements OnInit {

  constructor(
    private filmDataService: FilmDataService,
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private adminService: AdminService,
  ) { }

  displayedColumns: string[] = ['id', 'name', 'length', 'watched'];

  dataSource: MatTableDataSource<unknown> = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;

  user: Object = null;
  role: number = null;

  totalFilms: number = null;

  admin: boolean = false;

  isLoading: boolean = true;
  offline: boolean = false;

  removeToggle: boolean = false; // If false then remove buttons are not shown and film watched can be updated, opposite if true

  ngOnInit(): void {
    this.userService.getCurrentUser()
    .then((user) => {
      this.filmDataService.getUser(user.uid)
      .subscribe(res => {
        this.user = res;
        this.role = this.user['role'];
        if (this.role === 2) {
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

  toggleRemoveFilm(): void {
    this.removeToggle = !this.removeToggle;

    if (!this.removeToggle) this.displayedColumns.pop();
    else this.displayedColumns.push('removeFilm');
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateWatched(name: string): void {
    if (this.admin && !this.removeToggle) {
      if (confirm("Are you sure you want to flip watched value of " + name + "?")) {
        this.filmDataService.updateWatched(name)
        .subscribe(res => {
          this.getFilms(false);
        }, err => {
          console.log(err);
        });
      }
    }
  }

  getFilms(userFailed: boolean): void {
    const userFailedMessage: string = "Error getting user, if you're an admin you will not have the privileges in this session. Refresh the page to try again.";
    this.filmDataService.getData()
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
    );
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

  addFilm(): void {
    let name: string, len: number, watched: boolean;

    const dialogConfig: MatDialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      name: name,
      length: len,
      watched: watched
    }

    const dialogRef: MatDialogRef<unknown> = this.dialog.open(AddFilmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.filmDataService.addFilm(data)
          .subscribe(
            () => {
              this.getFilms(false);
            }
          );
        }
      }
    );
  }

  removeFilm(id: number): void {
    if (confirm("Are you sure you want to delete this film?")){
      this.filmDataService.removeFilm(id).subscribe(
        res => {
          this.getFilms(false);
        }, err => {
          console.log(err);
        }
      );
    }
  }
}