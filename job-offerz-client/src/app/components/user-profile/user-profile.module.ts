import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import {UserProfileComponent} from "./user-profile.component";
import {SharedModule} from "../../shared/modules/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UserProfileRoutingModule
  ],
  declarations: [UserProfileComponent]
})
export class UserProfileModule { }
