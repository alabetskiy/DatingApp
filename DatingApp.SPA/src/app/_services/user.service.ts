
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

import { Response } from '@angular/http';
import { PaginatedResult } from '../_models/Pagination';


@Injectable()
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private authHttp: AuthHttp) { }

  getUsers(page?: number, itemsPerPage?: number) {
    const paginatedResult:PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let queryString = '?';

    if(page != null && itemsPerPage != null){
      queryString +='pageNumber=' + page + '&pageSize=' +itemsPerPage;
    }
    return this.authHttp.get(this.baseUrl + 'users'+ queryString)
      .map((response:Response) => {
        paginatedResult.result = response.json(); //getting result from body
        if(response.headers.get('Pagination')!=null){ //checking if we have some data regarding current page itemsPerPage, totalItems and totalPages. 
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }

        return paginatedResult;
      })
      .catch(this.handleError);
  }

  getUser(id): Observable<User> {
    return this.authHttp.get(this.baseUrl + 'users/' + id)
      .map(response => <User>response.json())
      .catch(this.handleError);
  }

  updateUser(id: number, user: User) {
    return this.authHttp.put(this.baseUrl + 'users/' + id, user).catch(this.handleError);
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

  setMainPhoto(userId: number, id: number) {
    return this.authHttp.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {}).catch(this.handleError);
  }

deletePhoto(userId: number, id: number){
  return this.authHttp.delete(this.baseUrl + 'users/'+userId+'/photos/'+id).catch(this.handleError);
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