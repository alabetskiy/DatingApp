import { UserService } from './../_services/user.service';
import { Injectable } from '@angular/core';
import { User } from './../_models/User';
import { Resolve, Router } from "@angular/router";
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRouteSnapshot } from '@angular/router/src/router_state';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';


@Injectable() //we neeed this because it is not a component
export class ListsResolver implements Resolve<User[]> {
    pageSize = 5;
    pageNumber = 1;
    likesParam = 'Likers';
    constructor(private userService:UserService, 
                private router: Router, 
                private alertify:AlertifyService) {} 

//so basicly we go to our userService and getting the user and returning an Observable to our component

    resolve(route:ActivatedRouteSnapshot):Observable<User[]>{
        return this.userService.getUsers(this.pageNumber, this.pageSize, null, this.likesParam)
        .catch(error => {
            this.alertify.error('Problem retrieving data');
            this.router.navigate(['/members']);
            return Observable.of(null);
        })
    }
}