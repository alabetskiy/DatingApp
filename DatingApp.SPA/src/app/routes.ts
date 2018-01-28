import { MessagesResolver } from './_resolvers/message.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListComponent } from './list/list.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ListsResolver } from './_resolvers/lists.resolver';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'members', component: MemberListComponent, resolve: { users: MemberListResolver } },        //adding resolve will help me to get rid of "?" when accessing object property
            { path: 'members/:id', component: MemberDetailComponent, resolve: { user: MemberDetailResolver } }, //adding resolve will help me to get rid of "?" when accessing object property
            {
                path: 'member/edit', component: MemberEditComponent,
                resolve: { user: MemberEditResolver }, canDeactivate: [PreventUnsavedChanges]
            },        //adding resolve will help me to get rid of "?" when accessing object property. Using canDeactivate because we want to warning user that he has some unsaved changes.  
            { path: 'messages', component: MessagesComponent, resolve: { messages: MessagesResolver } },
            { path: 'lists', component: ListComponent, resolve: { users: ListsResolver } },
        ]
    },

    { path: '**', redirectTo: 'home', pathMatch: 'full' } //always should be on the buttom or it can override all routings

];