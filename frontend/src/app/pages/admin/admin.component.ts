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
import { RolesService } from 'src/app/services/roles/roles.service';

import { User } from 'src/app/models/user.model';
import { Role } from 'src/app/models/role.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private rolesService: RolesService,
  ) { }

  displayedColumns: string[] = ['uid', 'email','rolename'];

  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  users: User[];

  isLoading: boolean = true;

  roles: Role[];
  currentRole: Role;

  ngOnInit() {
    this.adminService.getUsers()
    .subscribe(res => {
      console.log("res:", res);
      this.users = res;
      this.dataSource.data = this.users;

      console.log("users:", this.users);

      this.isLoading = false;
    }, err => {
      console.log(err);

      this.isLoading = false;

      this.openSnackbar(["error getting users. Check internet connection"]);
    });

    this.rolesService.getAll()
    .subscribe(res => {
      console.log("roles:", res);

      this.roles = res;

      this.currentRole = this.roles[0];
      console.log("currentrole:", this.currentRole);
    })

    this.dataSource.sort = this.sort;
  }

  updateRole(uid: User): void {
    console.log("clicked", uid);
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
