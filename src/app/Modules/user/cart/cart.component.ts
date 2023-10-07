import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { itemInOrder, OrderCheckout } from 'src/app/Core/Models/order.model';
import { AuthNUserService } from 'src/app/Core/Services/Auth/auth-user.service';
import { ProductService } from 'src/app/Core/Services/Product/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  orderDetail!: OrderCheckout;
  itemList: itemInOrder[] = [];

  private cart$!: Subscription;

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.cart$ = this.productService.CartDetail.subscribe((cartDetail) => {

      if (cartDetail) {
        this.orderDetail = cartDetail.order;
        this.itemList = cartDetail.itemArr;
      }
    });
  }

  ngOnDestroy() {
    this.cart$ ? this.cart$.unsubscribe() : '';
  }

  ChangeQuantity(item: itemInOrder) {
    item.quantity *= 1;
    if (item.quantity <= 1) item.quantity = 1;
    if (item.quantity >= (item.itemInfor?.countInStock || 1))
      item.quantity = (item.itemInfor?.countInStock || 1) - 0;

    item.total = item.quantity * item.price;

    this.productService.UpdateItemInOrder(item);
  }

  DeleteItem(item: itemInOrder) {
    this.productService.RemoveItemFromOrder(item);
  }

  GoToCheckout() {
    this.router.navigateByUrl('/checkout');
  }
}
