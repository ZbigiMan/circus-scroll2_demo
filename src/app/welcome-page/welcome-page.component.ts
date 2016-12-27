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

  anim1OnBeginCallbackFunction(el) {
    // console.log('function: OnBegin', 'element:', el);
  }

  anim1OnEndCallbackFunction(el) {
    // console.log('function: OnEnd', 'element:', el);
  }

  anim1OnReverseBeginCallbackFunction(el) {
    // console.log('function: OnReverseBegin', 'element:', el);
  }

  anim1OnReverseEndCallbackFunction(el) {
    // console.log('function: OnReverseEnd', 'element:', el);
  }
  anim1OnProgressCallbackFunction(el, p) {
    // console.log('function: onProgress', 'element:', el, 'progress:', p);
  }

}
