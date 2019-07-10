import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { DataServiceService } from 'src/app/services/data-service.service';
import { UserService } from './../../auth/user.service';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddFilmDialogComponent } from './../../components/add-film-dialog/add-film-dialog.component';

export interface DialogData {
  name: string;
  length: number;
  watched: boolean;
}

@Component({
  selector: 'app-blurays',
  templateUrl: './blurays.component.html',
  styleUrls: ['./blurays.component.less']
})
export class BluraysComponent implements OnInit {

  constructor(
    private dataservice: DataServiceService,
    private userService: UserService,
    private dialog: MatDialog,
  ) { }

  displayedColumns: string[] = ['id', 'name', 'length', 'watched'];

  dataSource = new MatTableDataSource();

  user = null;
  role = null;

  totalFilms: number = null;

  admin: boolean = false;

  isLoading: boolean = true;
  
  ngOnInit(){
    this.getFilms();

    this.userService.getCurrentUser()
    .then((user) => {
      this.dataservice.getUser(user.uid)
      .subscribe(res => {
        this.user = res;
        this.role = this.user.role;
        if (this.role === 2) {
          this.displayedColumns.push('removeFilm');
          this.admin = true;
        }
      }, err => {
        alert("Error getting user, if you're an admin you will not have the privileges in this session. Refresh the page to try again");
      });
    })
    .catch(() => {
      console.log("error getting user");
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRowClicked(row)
  {

  }

  getFilms() {
    this.dataservice.getData()
    .subscribe(res => {
        this.dataSource.data = res;
        this.isLoading = false;
        this.totalFilms = res.length;

        localStorage.setItem("films", JSON.stringify(res));
      }, err => {
        console.log(err);
        const adminMessage: string = this.admin ? ' For admins, adding and removing films will not work.' : ''; // this will only work if the get user call comes in before this one fails which is unlikely, but it's still kinda nice to have
        const message: string = "Could not get table data, loading data from cache." + adminMessage;
        alert(message);

        this.dataSource.data = JSON.parse(localStorage.getItem("films"));
        this.isLoading = false;
        this.totalFilms = this.dataSource.data.length;
      }
    )
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
              this.getFilms();
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
          this.getFilms();
        }
      );
    }
  }

}