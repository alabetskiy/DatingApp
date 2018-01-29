import { PaginatedResult } from './../_models/Pagination';

import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, RequestOptions } from '@angular/http';
import { User } from '../_models/User';
import { Headers } from '@angular/http';
import { Response } from '@angular/http';
import { Message } from '../_models/message';
import { HttpParams, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private authHttp: HttpClient) { }

  getUsers(page?, itemsPerPage?, userParams?: any, likesParam?: string) {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      // queryString += 'pageNumber=' + page + '&pageSize=' + itemsPerPage + '&'; //old version to passing query params
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (likesParam === 'Likers') {
      // queryString += 'Likers=true&';                   //old version to passing query params
      params = params.append('Likers', 'true');
    }

    if (likesParam === 'Likees') {
      params = params.append('Likees', 'true');
    }

    if (userParams != null) {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy);
      // queryString +=                                      //old version to passing query params
      //   'minAge=' + userParams.minAge +
      //   '&maxAge=' + userParams.maxAge +
      //   '&gender=' + userParams.gender +
      //   '&orderBy=' + userParams.orderBy;
    }

    return this.authHttp.get<User[]>(this.baseUrl + 'users', { observe: 'response', params }) //we need to specify  observe: 'response' in order to get Response back instead of just a body
      .map(response => {
        paginatedResult.result = response.body; //getting result from body
        if (response.headers.get('Pagination') != null) { //checking if we have some data regarding current page itemsPerPage, totalItems and totalPages. 
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }

        return paginatedResult;
      })

  }

  getUser(id): Observable<User> {
    return this.authHttp.get<User>(this.baseUrl + 'users/' + id);
  }

  updateUser(id: number, user: User) {
    return this.authHttp.put(this.baseUrl + 'users/' + id, user);
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
    return this.authHttp.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {});
  }

  deletePhoto(userId: number, id: number) {
    return this.authHttp.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
  }


  sendLike(id: number, recipientId: number) {
    return this.authHttp.post(this.baseUrl + 'users/' + id + '/like/' + recipientId, {});
  }

  getMessages(id: number, page?, itemsPerPage?, messageContainer?: string) {
    const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<Message[]>();
    let params = new HttpParams();

    params = params.append('MessageContainer', messageContainer);

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.authHttp.get<Message[]>(this.baseUrl + 'users/' + id + '/messages', { observe: 'response', params })
      .map(response => {
        paginatedResult.result = response.body;

        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      });
  }


  getMessageThread(id: number, recipientId: number) {
    return this.authHttp.get<Message[]>(this.baseUrl + 'users/' + id + '/messages/thread/' + recipientId);
  }

  sendMessage(id: number, message: Message) {
    return this.authHttp.post<Message>(this.baseUrl + 'users/' + id + '/messages', message);
  }

  deleteMessages(id: number, userId: number) {
    return this.authHttp.post(this.baseUrl + 'users/' + userId + '/messages/' + id, {}).map(response => { });
  }

  markAsRead(userId: number, messageId: number) {
    return this.authHttp.post(this.baseUrl + 'users/' + userId + '/messages/' + messageId + '/read', {}).subscribe();
  }


}