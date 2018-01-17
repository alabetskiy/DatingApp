import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model:any = {};

  constructor(public authService:AuthService, private alertify:AlertifyService, private router:Router) { }

  ngOnInit() {
  }

login(){
  this.authService.login(this.model).subscribe(data => {
    
    this.alertify.success('logged in successfully');
  }, error =>{
    this.alertify.error('Invalid credentials');
  }, () => {      //after observable is complited, lets use anonumus function 
    this.router.navigate(['/members']);
  });
}

logout(){
  this.authService.userToken = null;
  this.authService.currentUser = null;
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.alertify.message('logged out!');
  this.router.navigate(['/home']);
}

loggedIn(){
  return this.authService.loggedIn();
}

}
