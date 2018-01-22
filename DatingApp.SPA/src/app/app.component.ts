import { JwtHelper } from 'angular2-jwt';
import { AuthService } from './_services/auth.service';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { User } from './_models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  JwtHelper: JwtHelper = new JwtHelper();

  constructor(private authService: AuthService) {

  }

  ngOnInit() {

    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (token) {
      this.authService.decodedToken = this.JwtHelper.decodeToken(token);
    }

    if (user) {
      this.authService.currentUser = user;
      debugger;
      if (this.authService.currentUser.photoUrl !== null) {
        this.authService.changeMemberPhoto(user.photoUrl);
      } else {
        this.authService.changeMemberPhoto('../assets/user.png');
      }
    }
  }
}
