import { OrderHistoryComponent } from './order-history/order-history.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/Core/Guards/auth.guard';

import { PageNotFoundComponent } from 'src/app/Shared/layout/page-not-found/page-not-found.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './user.component';
import { MyordersDetailComponent } from './myorders-detail/myorders-detail.component';
import { SearchComponent } from './search/search.component';
import { CanLeaveGuard } from 'src/app/Core/Guards/can-leave.guard';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
      },
      { path: 'product/:id', component: ProductDetailComponent },
      {
        path: 'cart',
        component: CartComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'my-profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'order-history',
        component: OrderHistoryComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'order/:id',
        component: MyordersDetailComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'search/:keyword',
        component: SearchComponent,
      },

      { path: '**', component: PageNotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
