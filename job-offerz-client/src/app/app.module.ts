import {BrowserModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {NgModule, Injector} from '@angular/core';
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpModule, Http, XHRBackend, RequestOptions} from "@angular/http";
import {AuthenticationService} from "./shared/services/authentication.service";
import {Router} from "@angular/router";
import {CustomHttpFactory} from "./factories/custom-http-factory";
import {OnlyLoggedOut} from "./shared/guards/only-logged-out.service";
import {JwtHelper} from "angular2-jwt";
import {OnlyLoggedIn} from "./shared/guards/only-logged-in.service";
import 'hammerjs';
import {GestureConfig} from "@angular/material";
import { EditOfferComponent } from './components/edit-offer/edit-offer.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AuthenticationService,
    JwtHelper,
    OnlyLoggedOut,
    OnlyLoggedIn,
    {
      provide: Http,
      useFactory: CustomHttpFactory,
      deps: [ XHRBackend, RequestOptions, Router, Injector]
    },
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
