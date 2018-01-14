import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { UserService } from './_services/user.service';
import { appRoutes } from './routes';
import { AlertifyService } from './_services/alertify.service';
import { AuthService } from './_services/auth.service';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListComponent } from './list/list.component';
import { MessagesComponent } from './messages/messages.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { AuthModule } from './auth/auth.module';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';




@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailComponent
],
  imports: [
    BrowserModule,
    HttpModule, //old http client
    FormsModule,
    HttpClientModule, //new http client 
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes), //appRoutes is my ts file where I define all my routes. 
    TabsModule.forRoot(),
    AuthModule   //this is my authModule which I got from https://github.com/auth0/angular2-jwt#advanced-configuration   
  ],
  providers: [
    AuthService,
    AlertifyService,
    AuthGuard,
    UserService,
    MemberDetailResolver,
    MemberListResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
