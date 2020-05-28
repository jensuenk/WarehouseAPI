import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ProductService } from './product.service';

import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { UsersComponent } from './users/users.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { OrdersComponent } from './orders/orders.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CookieService } from 'ngx-cookie-service';
import { DashboardComponent } from './dashboard/dashboard.component';
import {CardModule} from 'primeng/card';
import {TabViewModule} from 'primeng/tabview';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    UsersComponent,
    OrdersComponent,
    LoginPageComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PanelModule,
    TableModule,
    FormsModule,
    MessagesModule,
    MessageModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    TabViewModule
  ],
  providers: [
    ProductService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
