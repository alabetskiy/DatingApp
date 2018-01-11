import { JwtHelper } from 'angular2-jwt';
import { AuthService } from './_services/auth.service';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  JwtHelper:JwtHelper = new JwtHelper();

  constructor(private authService:AuthService)
  {

  }

  ngOnInit() {

  const token = localStorage.getItem('token');
  if (token) {
     this.authService.decodedToken=this.JwtHelper.decodeToken(token);
}
  }
  


}
