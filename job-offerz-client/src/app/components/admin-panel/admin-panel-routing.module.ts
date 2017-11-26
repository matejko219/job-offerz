import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminPanelComponent} from "./admin-panel.component";
import {OnlyAdmin} from "../../shared/guards/only-admin.service";

const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent,
    canActivateChild: [OnlyAdmin],
    children: [
      {
        path: 'offers',
        loadChildren: 'app/components/admin-panel/offers-panel/offers-panel.module#OffersPanelModule'
      },
      {
        path: 'categories',
        loadChildren: 'app/components/admin-panel/categories-panel/categories-panel.module#CategoriesPanelModule'
      },
      {
        path: 'companies',
        loadChildren: 'app/components/admin-panel/companies-panel/companies-panel.module#CompaniesPanelModule'
      },
      {
        path: 'users',
        loadChildren: 'app/components/admin-panel/users-panel/users-panel.module#UsersPanelModule'
      },
      {
        path: '',
        redirectTo: 'offers',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
