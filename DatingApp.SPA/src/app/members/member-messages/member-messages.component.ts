import { AlertifyService } from './../../_services/alertify.service';
import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../_models/message';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() userId: number;
  messages: Message[];
  newMessage: any = {};
  

  constructor(private userService:UserService, private authService:AuthService, private alertify:AlertifyService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.userService.getMessageThread(this.authService.decodedToken.nameid, this.userId).subscribe(messages =>{
      this.messages = messages;
    }, error => {
      this.alertify.error(error);
    })
  }

sendMessage(){
  this.newMessage.recipientId = this.userId;
  this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage).subscribe(message =>{
    this.messages.unshift(message);
    debugger;
    this.newMessage.content = '';
  }, error => {
    this.alertify.error(error);
  })
}

}
