import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChildComponent } from './child/child.component';
import { LoginComponent } from './login/login.component';
import { NeedAuthenticationGuard } from './NeedAuthenticationGuard';

@NgModule({
  declarations: [
    AppComponent,
    ChildComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [  NeedAuthenticationGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
