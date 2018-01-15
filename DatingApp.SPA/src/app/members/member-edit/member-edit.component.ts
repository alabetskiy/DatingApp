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
user:User;
@ViewChild('editForm') editForm: NgForm;

  constructor(private route:ActivatedRoute, private alertify:AlertifyService) { } //we need to inject ActivatedRoute because it will contain data, which we are fetching inside our route resolver (!)

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    })
  }

  updateUser(){
this.alertify.success('Profile updated sucessfully');
this.editForm.reset(this.user); //we are reseting the staet of our Form
  }

}
