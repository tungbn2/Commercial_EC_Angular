import { NgModule } from '@angular/core';

import { ProfileComponent } from './profile/profile.component';
import { CoreModule } from 'src/app/Core/Module/core/core.module';
import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { UserComponent } from './user.component';
import { HeaderComponent } from 'src/app/Shared/layout/header/header.component';
import { EditComponent } from './profile/edit/edit.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { EditShippingComponent } from 'src/app/Shared/component/edit-shipping/edit-shipping.component';
import { MyordersDetailComponent } from './myorders-detail/myorders-detail.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    ProfileComponent,
    HomeComponent,
    CartComponent,
    CheckoutComponent,
    ProductDetailComponent,
    UserComponent,

    HeaderComponent,
    EditComponent,
    OrderHistoryComponent,
    EditShippingComponent,
    MyordersDetailComponent,
    SearchComponent,
  ],
  imports: [CoreModule, UserRoutingModule],
})
export class UserModule {}
