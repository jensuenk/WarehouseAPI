import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { UsersComponent } from './users/users.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {path: "login", component: LoginPageComponent},
  {path: "users", component: UsersComponent},
  {path: "orders", component: OrdersComponent},
  {path: "products", component: ProductsComponent},
  {path: "dashboard", component: DashboardComponent},
  {path: "", redirectTo: "login", pathMatch: 'full'},
  {path: "**", redirectTo: "login"},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
