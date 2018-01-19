import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  _detail = '<p>k;faldf</p>';
 content;


  constructor() {

  }

  keyupHandlerFunction(event) {
   this.content = event;
  }

  submit() {
    console.log(this.content);
  }

  ngOnInit() {

  }
}
