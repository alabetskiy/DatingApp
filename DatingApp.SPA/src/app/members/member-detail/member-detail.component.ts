import { AlertifyService } from './../../_services/alertify.service';
import { UserService } from './../../_services/user.service';
import { User } from './../../_models/User';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { ViewChild } from '@angular/core/';
import { TabsetComponent } from 'ngx-bootstrap/tabs';


@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})

export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs') memberTabs : TabsetComponent;
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(private userService: UserService,
    private altrify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // this.loadUser(); we can use it and ignore resolver ..
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.route.queryParams.subscribe(params => {
      const selectedTab = params['tab'];
      this.memberTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
    this.galleryImages = this.getImages();
  }


getImages() {
  let imageUrls = [];
  for (let i = 0; i < this.user.photos.length; i++) {
    imageUrls.push({
      small:this.user.photos[i].url,
      medium:this.user.photos[i].url,
      big:this.user.photos[i].url,
      description:this.user.photos[i].description
    });
    // const imageUrls =+ this.user.photos[i].url;  
  }
  return imageUrls;
}
  //members/3
  // this.loadUser(); we can use it and ignore resolver ..
  // loadUser(){
  //   let userId = +this.route.snapshot.params['id'];   //I added + before agrument because I want actual number from route not string
  //   this.userService.getUser(userId).subscribe((user:User) => {
  //   this.user = user;
  //   }, error => {
  //     this.altrify.error(error);
  //   }); 
  // }

  selectTab(tabId:number){
    this.memberTabs.tabs[tabId].active = true;
  }
}
