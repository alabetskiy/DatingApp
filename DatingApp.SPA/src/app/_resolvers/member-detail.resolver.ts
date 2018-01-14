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
export class MemberDetailResolver implements Resolve<User> {
    constructor(private userService:UserService, 
                private router: Router, 
                private alertify:AlertifyService) {} 

//so basicly we go to our userService and getting the user and returning an Observable to our component

    resolve(route:ActivatedRouteSnapshot):Observable<User>{
        return this.userService.getUser(route.params['id'])
        .catch(error => {
            this.alertify.error('Problem retrieving data');
            this.router.navigate(['/members']);
            return Observable.of(null);
        })
    }
}