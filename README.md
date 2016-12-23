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
</h1>
```

#### Callback functions:

app.component.ts:

```javascript
export class AppComponent {

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

}
```

#### More documentation and examples soon.
### See demo: [www.zbigiman.com/circus-scroll2](http://www.zbigiman.com/circus-scroll2 "Circus Scroll 2")


