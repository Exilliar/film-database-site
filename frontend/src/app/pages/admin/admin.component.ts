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

import { Router } from '@angular/router';

import { UserService } from 'src/app/services/userService/user.service';
import { FilmDataService } from 'src/app/services/film-data/film-data.service';
import { AdminService } from 'src/app/services/admin/admin.service';
import { RolesService } from 'src/app/services/roles/roles.service';

import { User } from 'src/app/models/user.model';
import { Role } from 'src/app/models/role.model';
import { RawUser } from 'src/app/models/raw-user.model';

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
    private userService: UserService,
    private filmDataService: FilmDataService,

    private router: Router,
  ) { }

  displayedColumns: string[] = ['uid', 'email', 'rolename', 'viewTables'];

  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  users: User[];

  isLoading: boolean = true;

  roles: Role[];
  protectedRoles: Role[] = [];

  currentUserProtected: boolean; // Stores whether the current user is in a protected role (so can change other users to protected roles)

  ngOnInit() {
    this.getUserData();

    this.getRoleData();

    this.dataSource.sort = this.sort;
  }

  getUserData(): void {
    this.adminService.getUsers()
    .subscribe(res => {
      this.users = this.convertRawUser(res);
      this.dataSource.data = this.copyUsers(this.users);

      this.isLoading = false;
    }, err => {
      console.log(err);

      this.isLoading = false;

      this.openSnackbar(["Error getting users. Check internet connection"]);
    });
  }

  getCurrentUser(): void {
    let user: User;

    this.userService.getCurrentUser()
    .then((user: firebase.User) => {
      this.filmDataService.getUser(user.uid,user.email)
      .subscribe(res => {
        this.currentUserProtected = this.isProtected(res['role']);
      }, err => {
        console.log(err);
      })
    })
    .catch((err) => {
      console.log(err);
    });
  }

  getRoleData(): void {
    this.rolesService.getAll()
    .subscribe(res => {

      this.roles = res;

      this.roles = this.sortRoles(this.roles);

      this.protectedRoles = this.findProtectedRoles(this.roles);

      this.getCurrentUser();
    }, err => {
      console.log(err);

      this.openSnackbar(["Error getting roles. Check internet connection"]);
    });
  }

  sortRoles(roles: Role[]): Role[] {
    let placeholder: Role;

    for (let i = 0; i < roles.length; i++) {
      for (let x = i; x < roles.length; x++) {
        if (roles[i].id > roles[x].id) {
          placeholder = roles[i];
          roles[i] = roles[x];
          roles[x] = placeholder;
        }
      }
    }

    return roles;
  }

  convertRawUser(raw: RawUser[]): User[] {
    let convertedUsers: User[] = [];

    for (let i = 0; i < raw.length; i++) {
      const current: RawUser = raw[i];

      const currentRole: Role = {
        name: current.rolename,
        id: current.roleid,
        protected: current.protected
      }

      convertedUsers.push({
        role: currentRole,
        uid: current.uid,
        email: current.email
      });
    }

    return convertedUsers;
  }

  copyUsers(users: User[]): User[] {
    let newUsers: User[] = [];

    for (let u = 0; u < users.length; u++) {
      let currentUser: User = users[u];

      const newRole: Role = {
        name: currentUser.role.name,
        id: currentUser.role.id,
        protected: currentUser.role.protected
      }

      newUsers.push({
        role: newRole,
        uid: currentUser.uid,
        email: currentUser.email
      });
    }

    return newUsers;
  }

  findProtectedRoles(roles: Role[]): Role[] {
    let protect: Role[] = [];

    for (let r = 0; r < roles.length; r++) {
      if (roles[r].protected) protect.push(roles[r]);
    }

    return protect;
  }

  updateRole(user: User, newRole: number): void {
    if (this.isProtected(newRole)) {
      if (!this.currentUserProtected || !confirm("This will change the user to a protected role. This cannot be undone")) {
        this.dataSource.data = this.users;

        return;
      }
    }

    this.adminService.updateUser(newRole, user.uid)
    .subscribe(res => {
      this.getUserData();
    });
  }

  isProtected(newRole: number): boolean {
    for (let i = 0; i < this.protectedRoles.length; i++) {
      if (this.protectedRoles[i].id == newRole) return true;
    }

    return false;
  }

  viewTable(uid: string): void {
    this.router.navigate(['/viewTable', uid])
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
