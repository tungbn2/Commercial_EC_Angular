import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from 'src/app/Shared/layout/header/header.component';
import { ProductItemComponent } from 'src/app/Shared/component/product-item/product-item.component';
import { CartPopUpComponent } from 'src/app/Shared/component/cart-pop-up/cart-pop-up.component';
import { UserPopUpComponent } from 'src/app/Shared/component/user-pop-up/user-pop-up.component';
import { PageNotFoundComponent } from 'src/app/Shared/layout/page-not-found/page-not-found.component';

import { ForgotPasswordComponent } from 'src/app/Shared/component/forgot-password/forgot-password.component';
import { AlertPopupComponent } from 'src/app/Shared/component/alert-popup/alert-popup.component';
import { MaterialExampleModule } from './material.module';
import { LoginComponent } from 'src/app/Shared/component/login/login.component';
import { LogoutComponent } from 'src/app/Shared/component/register/logout.component';
import { BestSellerComponent } from 'src/app/Shared/component/best-seller/best-seller.component';
import { ProductListComponent } from 'src/app/Shared/component/product-list/product-list.component';
import { BtnQuantityComponent } from 'src/app/Shared/component/btn-quantity/btn-quantity.component';
import { FooterComponent } from 'src/app/Shared/layout/footer/footer.component';
import { NumberArrayPipe } from '../../Pipes/number-array.pipe';
import { ImgErrDirective } from '../../Directives/img-err.directive';
import { TableComponent } from 'src/app/Shared/component/table/table.component';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmPopupComponent } from 'src/app/Shared/component/confirm-popup/confirm-popup.component';

@NgModule({
  declarations: [
    ProductItemComponent,
    CartPopUpComponent,
    UserPopUpComponent,
    PageNotFoundComponent,
    LoginComponent,
    LogoutComponent,
    ForgotPasswordComponent,
    AlertPopupComponent,
    BestSellerComponent,
    BtnQuantityComponent,
    FooterComponent,
    TableComponent,
    ConfirmPopupComponent,

    // pipes
    NumberArrayPipe,

    // directive
    ImgErrDirective,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialExampleModule,
    OrderModule,
    NgxPaginationModule,
  ],
  exports: [
    //  exports modules
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialExampleModule,
    OrderModule,
    NgxPaginationModule,

    // exports component
    ProductItemComponent,
    CartPopUpComponent,
    UserPopUpComponent,
    PageNotFoundComponent,
    LoginComponent,
    LogoutComponent,
    ForgotPasswordComponent,
    AlertPopupComponent,
    BestSellerComponent,
    BtnQuantityComponent,
    FooterComponent,
    TableComponent,
    ConfirmPopupComponent,

    // exports pipes
    NumberArrayPipe,

    // exports directive
    ImgErrDirective,
  ],
})
export class CoreModule {}
