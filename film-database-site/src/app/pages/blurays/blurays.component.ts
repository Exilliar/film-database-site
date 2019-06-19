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

  title = 'film-database-site';

  displayedColumns: string[] = ['id', 'name', 'length', 'watched'];

  dataSource = new MatTableDataSource();

  user = null;
  role = null;
  
  ngOnInit(){
    this.getFilms();

    this.userService.getCurrentUser()
    .then((user) => {
      this.dataservice.getUser(user.uid)
      .subscribe(res => {
        this.user = res;
        this.role = this.user.role;
        console.log("role:", this.role);
      })
    })
    .catch(() => {
      console.log("error getting user")
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRowClicked(row)
  {
    console.log('Row clicked:',row);
  }

  getFilms() {
    this.dataservice.getData()
    .subscribe(res => {
        console.log(res);
        this.dataSource.data = res;
      }
    )
  }

  addFilm() {
    console.log("add a film");
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
        console.log("data:", data);
        if ((data.watched === 'true' || data.watched === 'false') && !isNaN(+data.length)) {
          this.dataservice.addFilm(data)
          .subscribe(
            data => {
              console.log("called api:", data);

              this.getFilms();
            }
          );
        } else {
          console.log("invalid input");
        }
      }
    )
  }

}