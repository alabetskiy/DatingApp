import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from './../../_services/alertify.service';
import { UserService } from './../../_services/user.service';
import { User } from './../../_models/User';
import { Component, OnInit } from '@angular/core';
import { Pagination, PaginatedResult } from '../../_models/Pagination';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];
  user: User = JSON.parse(localStorage.getItem('user'));
  genderList = [{value:'male', display:'Males'},{value:'female', display:'Females'}];
  userParams: any = {};
  pagination:Pagination;
  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.loadUsers();
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });

    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
  }


  loadUsers(){
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
    .subscribe((res:PaginatedResult<User[]>) => {
      this.users = res.result;
      this.pagination = res.pagination
    }, error => {
      this.alertify.error(error);
    })
  }


  resetFilters(){
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.loadUsers();
  }
  //This method copied from ngx-bootstrap in order to wire pageChanged event
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
    this.pagination.itemsPerPage = event.itemsPerPage;

    // console.log('Page changed to: ' + event.page);
    // console.log('Number items per page: ' + event.itemsPerPage);
  }
  // loadUsers() {
  //   this.userService.getUsers().subscribe((users: User[]) => {
  //     this.users = users;
  //   }, error => {
  //     this.alertify.error(error);
  //   })
  // }

}
