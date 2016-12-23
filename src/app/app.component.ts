// Circus Scroll 2
// Author: Zbigi Man Zbigniew Stępniewski, © 12.2016, MIT Licence

import { Component } from '@angular/core';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  title = 'Circus Scroll 2';
  
  // Callback functions

  anim1OnBegin(el) {
    // console.log('function: OnBegin', 'element:', el);
  }

  anim1OnEnd(el) {
    // console.log('function: OnEnd', 'element:', el);
  }

  anim1OnReverseBegin(el) {
    // console.log('function: OnReverseBegin', 'element:', el);
  }

  anim1OnReverseEnd(el) {
    // console.log('function: OnReverseEnd', 'element:', el);
  }
  anim1OnProgress(el, p) {
    // console.log('function: onProgress', 'element:', el, 'progress:', p);
  }

  /////////////////////////////////////////////////////////////////////////

  //  Tutorial

  //  Code Mirror config

  cmConfigHTML = {
    lineNumbers: true,
    mode: {
      name: 'xml'
    }
  };

  cmConfigTypeScript = {
    lineNumbers: true,
    mode: {
      name: 'javascript',
      json: true
    }
  };

  cmConfigSCSS = {
    lineNumbers: true,
    mode: {
      name: 'css'
    }
  };

  //

  // Code examples

  codeAppModule = `import { CircusScrollDirective } from './shared/circus-scroll.directive';

  //..

  @NgModule({
  //..   
  declarations: [
    //..
    CircusScrollDirective
    //..    
  ]
  //.. 
})`;

  codeHTML01 = `<h1 class="two" circus-scorll
    [csTweenBegin]="'10ovh'"
    [csTweenEnd]="'20ovh'"               
>
    2
</h1>`;

  codeSCSS01 = `
two.csTweenOnBegin {               
    transform: rotate(360deg) scale(2);
}
two.csTweenOnEnd {
    transition: all 1s ease;
    transform: rotate(720deg) scale(0);
    opacity: 0;
}`;

  codeHTML02 = `<h1 circus-scorll
    [csTweenBegin]="'0ovh'"
    [csTweenEnd]="'30ovh'"
    [csTweenFrom]="{letterSpacing : '0vw', fontSize : '10vh'}"
    [csTweenTo]="{letterSpacing : '5vw', fontSize : '0vh'}"
    [csTweenEasing]="'easeInOutQuad'"
    [csTweenOnBegin]="anim1OnBegin"
    [csTweenOnEnd]="anim1OnEnd"
    [csTweenOnReverseBegin]="anim1OnReverseBegin"
    [csTweenOnReverseEnd]="anim1OnReverseEnd"
    [csTweenOnProgress]="anim1OnProgress"
>
    Circus
</h1>`;

  codeAppComponent = `export class AppComponent {

    //..    

  anim1OnBegin(el) {
    console.log('function: OnBegin', 'element:', el);
  }

  anim1OnEnd(el) {
    console.log('function: OnEnd', 'element:', el);
  }

  anim1OnReverseBegin(el) {
    console.log('function: OnReverseBegin', 'element:', el);
  }

  anim1OnReverseEnd(el) {
    console.log('function: OnReverseEnd', 'element:', el);
  }
  anim1OnProgress(el, p) {
    console.log('function: onProgress', 'element:', el, 'progress:', p);
  }

  //.. 

}`;

  //
}
