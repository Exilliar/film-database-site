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

  displayedColumns: string[] = ['uid', 'email', 'rolename', 'viewTables'];

  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  users: User[];

  isLoading: boolean = true;

  roles: Role[];
  creatorRole: Role = {
    role: 3,
    name: ""
  }; // Default is role 3 as this is the creator role id at time of writing

  ngOnInit() {
    this.getUserData();

    this.getRoleData();

    this.dataSource.sort = this.sort;
  }

  getUserData(): void {
    this.adminService.getUsers()
    .subscribe(res => {
      console.log("res:", res);
      this.users = res;
      this.dataSource.data = this.copyUsers(this.users);

      console.log("users:", this.users);

      this.isLoading = false;
    }, err => {
      console.log(err);

      this.isLoading = false;

      this.openSnackbar(["Error getting users. Check internet connection"]);
    });
  }

  getRoleData(): void {
    this.rolesService.getAll()
    .subscribe(res => {
      console.log("roles:", res);

      this.roles = res;

      this.creatorRole = this.findCreator(this.roles)
      console.log("creatorRole:", this.creatorRole);
    }, err => {
      console.log(err);

      this.openSnackbar(["Error getting roles. Check internet connection"]);
    });
  }

  copyUsers(users: User[]): User[] {
    let newUsers: User[] = [];

    for (let u = 0; u < users.length; u++) {
      let currentUser: User = users[u];

      newUsers.push({
        rolename: currentUser.rolename,
        roleid: currentUser.roleid,
        uid: currentUser.uid,
        email: currentUser.email
      });
    }

    return newUsers;
  }

  findCreator(roles: Role[]): Role {
    let creator: Role = roles[0];

    for (let r = 0; r < roles.length; r++) {
      if (roles[r].role > creator.role) creator = roles[r];
    }

    return creator;
  }

  updateRole(user: User, newRole: number): void {
    console.log("user", user,"\nnewRole:", newRole);

    if (newRole === this.creatorRole.role) {
      if (!confirm("This will change the user to the creator role. This cannot be undone")) {
        this.dataSource.data = this.users;

        console.log("users:", this.users, "\ndataSource.data:", this.dataSource.data);

        return;
      }
    }
    console.log("update role");

    this.adminService.updateUser(newRole, user.uid)
    .subscribe(res => {
      console.log("res:", res);

      this.getUserData();
    });
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
