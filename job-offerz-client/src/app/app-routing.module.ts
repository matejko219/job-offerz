import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";

const routes: Routes = [
  { path: '',  loadChildren:  'app/components/home/home.module#HomeModule'},
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
