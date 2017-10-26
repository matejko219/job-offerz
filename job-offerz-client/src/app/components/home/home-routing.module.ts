import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home.component";
import {OnlyLoggedOut} from "../../shared/guards/only-logged-out.service";

const routes: Routes = [
  { path: '',
    component: HomeComponent,
    children: [
      { path: '',  loadChildren:  'app/components/landing/landing.module#LandingModule'},
      {
        path: 'login',
        loadChildren:  'app/components/login/login.module#LoginModule',
        canActivate: [OnlyLoggedOut]
      },
      {
        path: 'signup',
        loadChildren:  'app/components/signup/signup.module#SignupModule',
        canActivate: [OnlyLoggedOut]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
