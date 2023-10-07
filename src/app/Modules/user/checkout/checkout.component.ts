import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import {
  itemInOrder,
  OrderCheckout,
  OrderCreate,
} from 'src/app/Core/Models/order.model';
import { UserInfo } from 'src/app/Core/Models/user.model';
import { AuthNUserService } from 'src/app/Core/Services/Auth/auth-user.service';
import { ProductService } from 'src/app/Core/Services/Product/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  orderDetail!: OrderCheckout;
  itemList: itemInOrder[] = [];
  userInfo: UserInfo | null = null;
  paymentMethod: string = 'Online';

  isEditing: boolean = false;

  private sub$: Subscription[] = [];

  constructor(
    private auth: AuthNUserService,
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    let product$ = this.productService.CartDetail.subscribe((cartDetail) => {
      if (cartDetail) {
        this.orderDetail = cartDetail.order;
        this.itemList = cartDetail.itemArr;
      }
    });

    let auth$ = this.auth.UserInfo.subscribe((user) => (this.userInfo = user));

    this.sub$ = [auth$, product$];
  }

  ngOnDestroy() {
    this.sub$.forEach((item) => item.unsubscribe());
  }

  changeModeEdit() {
    this.isEditing = !this.isEditing;
  }

  SubmitOrder() {
    if (this.orderDetail?.paymentMethod == this.paymentMethod) {
      this.orderDetail.paymentMethod = this.paymentMethod;
      this.productService.UpdatePaymentMethod(this.paymentMethod);
    }

    if (!this.orderDetail?.contact) this.orderDetail.contact = '0123456789';

    // re-define order
    let newItemArr = this.itemList.map((item) => {
      let newItem: itemInOrder = {
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        total: item.total,
      };
      return newItem;
    });

    let newOrder: OrderCreate = {
      order: this.orderDetail,
      itemArr: [...newItemArr],
    };

    this.productService.CreateOrder(newOrder).subscribe(
      (data) => {
        if (this.userInfo) this.productService.ResetOrder(this.userInfo);
        this.router.navigateByUrl('/order-history');
        this.toastr.success('Place Order Success!');
      },
      (error) => {
        this.toastr.error(error?.error?.message);
      }
    );
  }
}
