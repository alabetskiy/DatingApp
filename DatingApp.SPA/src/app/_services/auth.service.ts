import { AuthUser } from './../_models/AuthUser';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../_models/User';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  userToken: any;
  decodedToken: any;
  currentUser: User;
  private photoUrl = new BehaviorSubject<string>('../../assets/user.png'); //using BehaviourSubject to export values to any component
  currentPhotoUrl = this.photoUrl.asObservable(); // we're using it because we want certain component can subscribe to it and get latest photoUrl
  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService ) { }

  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl); //assigning value for photoUrl BehaviorSubject
  }

  login(model: any) {


    return this.http.post<AuthUser>(this.baseUrl + 'login', model,{headers: new HttpHeaders() //Specify <AuthUser> in order to help map(user) see properties 
      .set('Content-Type', 'application/json')}).map(user => { 
     
      if (user && user.tokenString) {
        localStorage.setItem('token', user.tokenString);
        localStorage.setItem('user', JSON.stringify(user.user));
        this.decodedToken = this.jwtHelperService.decodeToken(user.tokenString);
        this.currentUser = user.user;
        this.userToken = user.tokenString;
        if(this.currentUser.photoUrl !== null) {
          this.changeMemberPhoto(this.currentUser.photoUrl);
        } else {
          this.changeMemberPhoto('../../assets/user.png'); //do not foget to add it globaly in app.component.ts. It will help to avoid issue with refresh button
        }
       
      }
    }).catch(this.handleError);
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model, {headers: new HttpHeaders()
      .set('Content-Type', 'application/json')}).catch(this.handleError);
  }

  loggedIn() {
    const token = this.jwtHelperService.tokenGetter(); //get our token and store on localStorage

    if(!token) 
      return false;

    return !this.jwtHelperService.isTokenExpired(token);

  }


  private handleError(error: any) {

    const applicationError = error.headers.get('Application-Error');
    if (applicationError) {
      return Observable.throw(applicationError);
    }


    const serverError = error.json();
    let modelStateErrors = '';
    if (serverError) {
      for (const key in serverError) {
        if (serverError[key]) {
          modelStateErrors += serverError[key] + '\n';
        }
      }
    }
    return Observable.throw(modelStateErrors || 'Server error');
  }
}
