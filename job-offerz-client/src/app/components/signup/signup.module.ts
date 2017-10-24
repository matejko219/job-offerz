import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import {SharedModule} from "../../shared/modules/shared.module";
import {MatchPasswordDirective} from "../../directives/match-password.directive";
import {UserService} from "../../services/user.service";

@NgModule({
  imports: [
    CommonModule,
    SignupRoutingModule,
    SharedModule
  ],
  declarations: [
    SignupComponent,
    MatchPasswordDirective
  ],
  providers: [
    UserService
  ]
})
export class SignupModule { }
