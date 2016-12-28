import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CodemirrorModule } from 'ng2-codemirror';

import { AppComponent } from './app.component';
import { CircusScrollDirective } from '../../node_modules/circus-scroll2/dist/circus-scroll.directive';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ReadMeComponent } from './read-me/read-me.component';

@NgModule({
  declarations: [
    AppComponent,
    CircusScrollDirective,
    HeaderComponent,
    FooterComponent,
    WelcomePageComponent,
    ReadMeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CodemirrorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
