import { AlertifyService } from './../../_services/alertify.service';
import { UserService } from './../../_services/user.service';
import { User } from './../../_models/User';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})

export class MemberDetailComponent implements OnInit {
user:User
  constructor(private userService:UserService, 
    private altrify:AlertifyService,
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.loadUser();
  }

  //members/3
loadUser(){
  let userId = +this.route.snapshot.params['id'];   //I added + before agrument because I want actual number from route not string
  this.userService.getUser(userId).subscribe((user:User) => {
  this.user = user;
  }, error => {
    this.altrify.error(error);
  }); 
}
}
