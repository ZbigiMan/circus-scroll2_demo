# circus-scroll2
Angular 2 Directive for scroll animations

### Instalation

```
git clone https://github.com/ZbigiMan/circus-scroll2_demo

cd circus-scroll2_demo

npm install

ng serve

```

### How to use

#### Import CircusScrollDirective

app.module.ts:

```javascript
import { CircusScrollDirective } from 'your_path_to/node_modules/circus-scroll2/dist/circus-scroll.directive';

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

### Example 1.
#### CSS animation using triggered classes.

HTML:

```html
<h1 class="two" circus-scroll
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

### Example 2.
#### Animation fully synchronized with scroll and callbacks.

HTML:

```html
<h1 circus-scroll
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

app.component.ts:

```javascript
export class AppComponent {

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

}
```

### Example 3.
#### Smooth scroll to anchor.

#### Minimal configuration:

HTML:

```html

<a href="#example3" class="nav-link" circus-scroll>Example 3</a>

```
>#### Defaults:
>duration: 1000,
>easing: easeOutQuad

#### Extended configuration:

HTML:

```html
<a href="#example3" class="nav-link" circus-scroll
  [csTweenDuration] = "1500"
  [csTweenEasing] = "easeInOutQuad"
>
  Example 3
</a>
```

### Easing types:

* linear
* swing
* easeInQuad
* easeOutQuad
* easeInOutQuad
* easeInCubic
* easeOutCubic
* easeInOutCubic
* easeInQuart
* easeInOutQuart
* easeInQuint
* easeOutQuint
* easeInOutQuint
* easeInSine
* easeOutSine
* easeInOutSine
* easeInExpo
* easeOutExpo
* easeInOutExpo
* easeInCirc
* easeOutCirc
* easeInOutCirc
* easeInElastic
* easeOutElastic
* easeInOutElastic
* easeInBack
* easeOutBack
* easeInOutBack
* easeInBounce
* easeOutBounce
* easeInOutBounce

#### More documentation and examples soon.
### See demo: [www.zbigiman.com/circus-scroll2](http://www.zbigiman.com/circus-scroll2 "Circus Scroll 2")
### See demo source: [https://github.com/ZbigiMan/circus-scroll2_demo](https://github.com/ZbigiMan/circus-scroll2_demo "circus-scroll2_demo")


