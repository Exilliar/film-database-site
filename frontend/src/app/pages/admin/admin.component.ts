import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
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
  ) { }

  displayedColumns: string[] = ['uid', 'email', 'role'];

  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  users: User[];

  isLoading: boolean = true;

  ngOnInit() {
    this.adminService.getUsers()
    .subscribe(res => {
      console.log(res);
      this.users = res;
      this.dataSource.data = this.users;
      console.log("datasource:", this.dataSource.data);

      this.isLoading = false;
    }); // INCLUDE A CATCH HERE (with some form of error snackbar or something)

    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
