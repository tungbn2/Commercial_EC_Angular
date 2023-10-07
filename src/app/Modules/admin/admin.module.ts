import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { NavigationAdminComponent } from 'src/app/Shared/layout/navigation-admin/navigation-admin.component';
import { MenubarAdminComponent } from 'src/app/Shared/layout/menubar-admin/menubar-admin.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { CoreModule } from 'src/app/Core/Module/core/core.module';
import { CanLeaveGuard } from 'src/app/Core/Guards/can-leave.guard';
import { PageNotFoundComponent } from 'src/app/Shared/layout/page-not-found/page-not-found.component';

const routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'products',
        component: ProductListComponent,
      },
      {
        path: 'products/create-product',
        component: CreateProductComponent,
        canDeactivate: [CanLeaveGuard],
      },
      {
        path: 'products/:id/update',
        component: CreateProductComponent,
        canDeactivate: [CanLeaveGuard],
      },
      {
        path: 'orders',
        component: OrderListComponent,
      },
      {
        path: 'orders/:id',
        component: OrderDetailComponent,
      },
      {
        path: 'users',
        component: UserListComponent,
      },
      {
        path: 'users/create-user',
        component: CreateUserComponent,
        canDeactivate: [CanLeaveGuard],
      },
      {
        path: 'users/:id/update',
        component: CreateUserComponent,
        canDeactivate: [CanLeaveGuard],
      },
      {
        path: 'users/:id',
        component: UserDetailComponent,
      },
      {
        path: '**',
        component: PageNotFoundComponent
      }
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  declarations: [
    AdminComponent,
    CreateUserComponent,
    UserListComponent,
    CreateProductComponent,
    OrderListComponent,
    ProductListComponent,
    UserDetailComponent,
    OrderDetailComponent,
    NavigationAdminComponent,
    MenubarAdminComponent,
  ],
  imports: [CommonModule, CoreModule, RouterModule.forChild(routes)],
  providers: [CanLeaveGuard],
})
export class AdminModule {}
