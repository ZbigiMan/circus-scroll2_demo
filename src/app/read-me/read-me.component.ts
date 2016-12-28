import { Component, OnInit } from '@angular/core';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/shell/shell';

@Component({
  selector: 'app-read-me',
  templateUrl: './read-me.component.html',
  styleUrls: ['./read-me.component.scss']
})
export class ReadMeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  //  Code Mirror config

  cmConfigHTML = {
    readOnly: true,
    lineNumbers: true,
    mode: {
      name: 'xml'
    }
  };

  cmConfigTypeScript = {
    readOnly: true,
    lineNumbers: true,
    mode: {
      name: 'javascript',
      json: true
    }
  };

  cmConfigSCSS = {
    readOnly: true,
    lineNumbers: true,
    mode: {
      name: 'css'
    }
  };

  cmConfigShell = {
    readOnly: true,
    lineNumbers: true,
    mode: {
      name: 'shell'
    }
  };

  //

  // Code examples

  codeInstallGit = `git clone https://github.com/ZbigiMan/circus-scroll2

cd circus-scroll2

npm install

ng serve`;

  codeInstallNpm = `
npm install circus-scroll2
  `;
  
  codeAppModuleGit = `
import { CircusScrollDirective } from './shared/circus-scroll.directive';
  `

  codeAppModuleNpm= `
import { CircusScrollDirective } from 'your_path_to/node_modules/dist/circus-scroll.directive';
  `
  
  codeAppModuleDeclaration = `//..

  @NgModule({
  //..   
  declarations: [
    //..
    CircusScrollDirective
    //..    
  ]
  //.. 
})`;

  codeExample1HTML = `<h1 class="two" circus-scroll
    [csTweenBegin]="'10ovh'"
    [csTweenEnd]="'20ovh'"               
>
    2
</h1>`;

  codeExample1CSS = `
.two.csTweenOnBegin {               
    transition: all 1s ease;
    transform: rotate(360deg) scale(2);
}
.two.csTweenOnEnd {
    transition: all 1s ease;
    transform: rotate(720deg) scale(0);
    opacity: 0;
}`;

  codeExample2HTML = `<h1 circus-scroll
    [csTweenBegin]="'0ovh'"
    [csTweenEnd]="'40ovh'"
    [csTweenFrom]="{letterSpacing : '0vw', fontSize : '10vh'}"
    [csTweenTo]="{letterSpacing : '5vw', fontSize : '2vh'}"
    [csTweenEasing]="'easeInOutQuad'"
    [csTweenOnBegin]="anim1OnBeginCallbackFunction"
    [csTweenOnEnd]="anim1OnEndCallbackFunction"
    [csTweenOnReverseBegin]="anim1OnReverseBeginCallbackFunction"
    [csTweenOnReverseEnd]="anim1OnReverseEndCallbackFunction"
    [csTweenOnProgress]="anim1OnProgressCallbackFunction"
>`;

  codeExample2Component = `export class AppComponent {

    //..    

 anim1OnBeginCallbackFunction(data) {
    console.log('function: OnBegin', 'element:', data.el);
  }

  anim1OnEndCallbackFunction(data) {
    console.log('function: OnEnd', 'element:', data.el);
  }

  anim1OnReverseBeginCallbackFunction(data) {
    console.log('function: OnReverseBegin', 'element:', data.el);
  }

  anim1OnReverseEndCallbackFunction(data) {
    console.log('function: OnReverseEnd', 'element:', data.el);
  }
  anim1OnProgressCallbackFunction(data) {
    console.log('function: onProgress', 'element:', data.el, 'progress:', data.progress);
  }


  //.. 

}`;

  //

}
