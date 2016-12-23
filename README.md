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

CSS

```CSS
two.csTweenOnBegin {               
    transform: rotate(360deg) scale(2);
}
two.csTweenOnEnd {
    transition: all 1s ease;
    transform: rotate(720deg) scale(0);
    opacity: 0;
}
```


