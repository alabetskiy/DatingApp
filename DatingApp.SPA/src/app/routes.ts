import { ListComponent } from './list/list.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    {
        path:'', 
        runGuardsAndResolvers:'always',
        canActivate:[AuthGuard],
        children: [
            { path: 'members', component: MemberListComponent },
            { path: 'messages', component: MessagesComponent },
            { path: 'lists', component: ListComponent  },
        ]
    },
   
    { path: '**', redirectTo: 'home', pathMatch: 'full' } //always should be on the buttom or it can override all routings

];