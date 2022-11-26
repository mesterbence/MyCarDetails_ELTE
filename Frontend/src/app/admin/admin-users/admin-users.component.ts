import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  constructor(private userService: UserService) { }

  users!: User[];
  dataSource!: any;
  displayedColumns: string[] = ['id', 'username', 'email', 'role'];

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
      this.dataSource = new MatTableDataSource(this.users);
    })
  }

}
