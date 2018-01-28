import { AuthService } from './../_services/auth.service';
import { UserService } from './../_services/user.service';
import { Injectable } from '@angular/core';
import { User } from './../_models/User';
import { Resolve, Router } from "@angular/router";
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRouteSnapshot } from '@angular/router/src/router_state';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Message } from '../_models/message';


@Injectable() //we neeed this because it is not a component
export class MessagesResolver implements Resolve<Message[]> {
    pageSize = 5;
    pageNumber = 1;
    messageContainer = 'Unread';
    constructor(private userService:UserService, 
                private router: Router, 
                private alertify:AlertifyService,
                private authService: AuthService) {} 

//so basicly we go to our userService and getting the user and returning an Observable to our component

    resolve(route:ActivatedRouteSnapshot):Observable<Message[]>{
        return this.userService.getMessages(this.authService.decodedToken.nameid, this.pageNumber, this.pageSize, this.messageContainer)
        .catch(error => {
            this.alertify.error('Problem retrieving data');
            this.router.navigate(['/members']);
            return Observable.of(null);
        })
    }
}