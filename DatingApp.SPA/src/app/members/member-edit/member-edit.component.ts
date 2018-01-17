import { AuthService } from './../../_services/auth.service';
import { UserService } from './../../_services/user.service';
import { AlertifyService } from './../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { User } from './../../_models/User';
import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;
  @ViewChild('editForm') editForm: NgForm;
  photoUrl:string;

  constructor(private route: ActivatedRoute, //we need to inject ActivatedRoute because it will contain data, which we are fetching inside our route resolver (!)
    private alertify: AlertifyService,
    private userService: UserService,
    private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    })
    this.authService.currentPhotoUrl.subscribe(photoUrl =>this.photoUrl = photoUrl); //assigning value from Observable to this.photoUrl. And now we can use it in member-edit.component.html
  }

  updateUser() {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
      this.alertify.success('Profile updated sucessfully');
      this.editForm.reset(this.user); //we are reseting the staet of our Form
    }, error => {
      this.alertify.error(error);
    })
  }

  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }

}
