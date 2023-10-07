import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { listOrderColumnNames } from 'src/app/Core/Constants/columnName.const';
import { OrderDetail } from 'src/app/Core/Models/order.model';
import { ColumnField } from 'src/app/Core/Models/product.model';
import { AuthNUserService } from 'src/app/Core/Services/Auth/auth-user.service';
import { ProductService } from 'src/app/Core/Services/Product/product.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
  // table
  listColumnResponsive = ['User ID', 'Address', 'Contact', 'Paided'];
  public listOrderColumnNames: ColumnField[] = listOrderColumnNames;
  public listData: any[] = [];
  public totalItems!: number;

  private sub$: Subscription[] = [];

  constructor(
    private auth: AuthNUserService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.MyOrders();

    let order$ = this.productService.MyOrder.subscribe((myOrders) => {
      this.totalItems = myOrders?.total || 0;
      this.listData = myOrders?.result || [];
    });

    this.sub$ = [order$];
  }

  ngOnDestroy() {
    this.sub$.forEach((item) => item.unsubscribe());
  }

  Logout() {
    this.auth.Logout();
  }

  // table
  handleChangePage(pageData: any) {
    let params = { ...pageData, page: pageData - 1 };

    this.productService.MyOrders(params);
  }

  handleEditOrder(id: number) {
    this.router.navigateByUrl(`/order/${id}`);
  }

  HandleItemClick(id: number) {
    this.router.navigateByUrl(`order/${id}`);
  }
}
