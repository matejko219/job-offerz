import { BrowserModule } from '@angular/platform-browser';
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
import { ContactStepComponent } from './shared/components/offer-form/contact-step/contact-step.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactStepComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
