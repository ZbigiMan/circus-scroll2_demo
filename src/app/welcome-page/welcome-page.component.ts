import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // Callback functions

  anim1OnBeginCallbackFunction(data) {
    //  console.log('function: OnBegin', 'element:', data.el);
  }

  anim1OnEndCallbackFunction(data) {
    //  console.log('function: OnEnd', 'element:', data.el);
  }

  anim1OnReverseBeginCallbackFunction(data) {
    //  console.log('function: OnReverseBegin', 'element:', data.el);
  }

  anim1OnReverseEndCallbackFunction(data) {
    //  console.log('function: OnReverseEnd', 'element:', data.el);
  }
  anim1OnProgressCallbackFunction(data) {
    // console.log('function: onProgress', 'element:', data.el, 'progress:', data.progress);
  }

}
