import { ActivatedRoute } from '@angular/router';
import { User } from './../../_models/User';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
user:User;
  constructor(private route:ActivatedRoute) { } //we need to inject ActivatedRoute because it will contain data, which we are fetching inside our route resolver (!)

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    })
  }

}
