import { Observable, Subscription, switchMap } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthNUserService } from 'src/app/Core/Services/Auth/auth-user.service';
import { ProductService } from 'src/app/Core/Services/Product/product.service';
import { listOrderItemsColumnNames } from 'src/app/Core/Constants/columnName.const';
import { ColumnField } from 'src/app/Core/Models/product.model';
import { itemInOrder, OrderDetail } from 'src/app/Core/Models/order.model';
import { UserInfo } from 'src/app/Core/Models/user.model';

@Component({
  selector: 'app-myorders-detail',
  templateUrl: './myorders-detail.component.html',
  styleUrls: ['./myorders-detail.component.css'],
})
export class MyordersDetailComponent implements OnInit, OnDestroy {
  orderId: number = 0;

  public listOrderItemsColumnNames: ColumnField[] = listOrderItemsColumnNames;
  public listItem: itemInOrder[] = [];
  public orderDetails$!: Observable<any>;
  public order!: OrderDetail;
  public customerInfor!: UserInfo;

  private sub$: Subscription[] = [];

  constructor(
    private auth: AuthNUserService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let route$ = this.route.params
      .pipe(
        switchMap((param) => {
          this.orderId = param['id'];

          return this.productService.GetOrderById(this.orderId);
        })
      )
      .subscribe((res) => {
        this.order = res?.data?.order;
        this.listItem = res?.data?.items;
      });

    this.sub$ = [route$];
  }

  ngOnDestroy() {
    this.sub$.forEach((item) => item.unsubscribe());
  }

  Logout() {
    this.auth.Logout();
  }

  HandleItemClick(id: number) {
    this.router.navigateByUrl(`/product/${id}`);
  }
}
