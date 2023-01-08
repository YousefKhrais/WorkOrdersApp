import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IconsProviderModule } from './icons-provider.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

import { WorkOrdersDetailsComponent } from './components/work-order/work-orders-details/work-orders-details.component';
import { WorkOrdersListComponent } from './components/work-order/work-orders-list/work-orders-list.component';
import { WorkOrderHeaderFormComponent } from './components/work-order/work-order-header-form/work-order-header-form.component';
import { WorkOrderDetailsTableComponent } from './components/work-order/work-order-details-table/work-order-details-table.component';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';
import { LoginComponent } from './components/auth/login/login.component';
import { UserAccountMenuComponent } from './components/user-account-menu/user-account-menu.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    DashboardLayoutComponent,
    WorkOrdersDetailsComponent,
    WorkOrdersListComponent,
    WorkOrderHeaderFormComponent,
    WorkOrderDetailsTableComponent,
    UserAccountMenuComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzIconModule,
    IconsProviderModule,
    NzBreadCrumbModule,
    NzTableModule,
    NzDropDownModule,
    NzToolTipModule,
    NzNotificationModule,
    NzModalModule,
    NzAvatarModule
  ],
  providers: [
    DatePipe,
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
