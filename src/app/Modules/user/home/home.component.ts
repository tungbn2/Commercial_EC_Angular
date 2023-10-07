import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AuthNUserService } from 'src/app/Core/Services/Auth/auth-user.service';

import { Categories, benefit } from 'src/app/Core/Constants/other.conts';
import { ProductService } from 'src/app/Core/Services/Product/product.service';
import { Router } from '@angular/router';
import { ItemDetail } from 'src/app/Core/Models/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  Categories = Categories;
  benefit = benefit;

  productList: ItemDetail[] = [];
  totalPages: number = -1;
  userId: number | undefined;

  private sub$: Subscription[] = [];

  // pagination
  // MatPaginator Inputs
  length = 0;
  pageSize = 12;
  pageSizeOptions: number[] = [8, 12, 16];

  // MatPaginator Output
  pageEvent: PageEvent = {
    length: this.length,
    pageIndex: 0,
    pageSize: this.pageSize,
  };

  goPage(event: PageEvent) {
    this.pageEvent = { ...event };

    this.productService.GetAllProductsUser({
      page: event.pageIndex,
      size: event.pageSize,
    });
  }

  goToPage(page: number) {
    this.pageEvent.pageIndex = page;
    this.goPage(this.pageEvent);
  }

  constructor(
    private auth: AuthNUserService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.GetAllProductsUser({ size: 12 });

    let product$ = this.productService.ProductsResult.subscribe((data) => {
      this.productList = data?.result as ItemDetail[];
      this.totalPages = data?.totalPages || 0;
      this.length = data?.total || 10;
    });

    let auth$ = this.auth.UserInfo.subscribe((user) => {
      this.userId = user?.id;
    });

    this.sub$ = [product$, auth$];
  }

  ngOnDestroy() {
    this.sub$.forEach((item) => item.unsubscribe());
  }

  //  method
  onHandleChangePage(event: number) {}
}
