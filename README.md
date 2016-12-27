# circus-scroll2
Angular 2 Directive for scroll animations

### Instalation

```
git clone https://github.com/ZbigiMan/circus-scroll2

cd circus-scroll2

npm install

ng serve

```

### How to use

#### Import CircusScrollDirective

app.module.ts:

```javascript
import { CircusScrollDirective } from './shared/circus-scroll.directive';

  //..

  @NgModule({
  //..   
  declarations: [
    //..
    CircusScrollDirective
    //..    
  ]
  //.. 
})
```

#### Example 1

HTML:

```html
<h1 class="two" circus-scorll
    [csTweenBegin]="'10ovh'"
    [csTweenEnd]="'20ovh'"               
>
    2
</h1>
```

>ovh - viewport offset counted in vh.

CSS:

```CSS
.two.csTweenOnBegin {               
    transform: rotate(360deg) scale(2);
}
.two.csTweenOnEnd {
    transition: all 1s ease;
    transform: rotate(720deg) scale(0);
    opacity: 0;
}
```

#### Example 2

HTML:

```html
<h1 circus-scorll
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
>
    Circus
</h1>
```

#### Callback functions:

your.component.ts:

```javascript
export class AppComponent {

    //..    

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

  //.. 

}
```

#### More documentation and examples soon.
### See demo: [www.zbigiman.com/circus-scroll2](http://www.zbigiman.com/circus-scroll2 "Circus Scroll 2")


