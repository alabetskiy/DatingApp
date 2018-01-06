import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {
value:any;
  constructor(private http: Http) { }

  ngOnInit() {

    this.getValue();
  }
getValue(){
  
  this.http.get('http://localhost:5000/api/values').subscribe(response=>{
    this.value = response.json();
  })
}
}
