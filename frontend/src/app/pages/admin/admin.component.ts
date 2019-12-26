import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatSort,
  MatTableDataSource,
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBarRef,
} from '@angular/material';
import { AdminService } from 'src/app/services/admin/admin.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
  ) { }

  displayedColumns: string[] = ['uid', 'email', 'role'];

  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  users: User[];

  isLoading: boolean = true;

  ngOnInit() {
    this.adminService.getUsers()
    .subscribe(res => {
      this.users = res;
      this.dataSource.data = this.users;

      this.isLoading = false;
    }, err => {
      console.log(err);

      this.isLoading = false;

      this.openSnackbar(["error getting users. Check internet connection"]);
    });

    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openSnackbar(message: string[]): void { // MOVE THIS INTO A SEPARATE CLASS. IT IS NOW USED IN MULTIPLE COMPONENTS
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
