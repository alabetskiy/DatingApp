import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, RequestOptions } from '@angular/http';
import { User } from '../_models/User';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AuthHttp } from 'angular2-jwt';


@Injectable()
export class UserService {
    baseUrl = environment.apiUrl;

    constructor(private authHttp: AuthHttp) { }

    getUsers(): Observable<User[]> {
        return this.authHttp.get(this.baseUrl + 'users')
        .map(response => <User[]>response.json())
        .catch(this.handleError);
    }

    getUser(id):Observable<User> {
      return this.authHttp.get(this.baseUrl+'users/'+id)
                  .map(response => <User>response.json())
                  .catch(this.handleError);
    }
    // we no longer need this method to attach token to request. 
    // private jwt() {
    //     let token = localStorage.getItem('token');
    //     if (token) {
    //         let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    //         headers.append('Content-type', 'application/json');
    //         return new RequestOptions({ headers: headers })
    //     }
    // }



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