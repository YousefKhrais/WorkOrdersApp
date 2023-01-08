import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkOrdersDetailsComponent } from './components/work-order/work-orders-details/work-orders-details.component';
import { WorkOrdersListComponent } from './components/work-order/work-orders-list/work-orders-list.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/auth/login/login.component';
import { AppComponent } from './app.component';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', component: WorkOrdersListComponent, },
      { path: 'orders', component: WorkOrdersListComponent },
      { path: 'orders/:orderId', component: WorkOrdersDetailsComponent }
    ],
  },

  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
