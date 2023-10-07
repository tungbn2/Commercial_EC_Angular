import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { of, Subscription, switchMap } from 'rxjs';
import { ItemDetail } from 'src/app/Core/Models/product.model';
import { AuthNUserService } from 'src/app/Core/Services/Auth/auth-user.service';
import { ProductService } from 'src/app/Core/Services/Product/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  keyword: string = '';

  productList: ItemDetail[] = [];
  totalPages: number = -1;
  userId: number | undefined;

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

    this.productService.SearchProductsUser({
      page: event.pageIndex,
      size: event.pageSize,
      keyword: this.keyword,
    });
  }

  goToPage(page: number) {
    this.pageEvent.pageIndex = page;
    this.goPage(this.pageEvent);
  }

  private sub$: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private auth: AuthNUserService
  ) {}

  ngOnInit(): void {
    let route$ = this.route.params
      .pipe(
        switchMap((params) => {
          this.keyword = params['keyword'];
          this.productService.SearchProductsUser({
            keyword: this.keyword,
            size: this.pageSize,
          });

          return this.productService.ProductsResult;
        })
      )
      .subscribe((data) => {
        this.productList = data?.result as ItemDetail[];
        this.totalPages = data?.totalPages || 0;
        this.length = data?.total || 10;
      });

    let auth$ = this.auth.UserInfo.subscribe((user) => {
      this.userId = user?.id;
    });
  }

  ngOnDestroy() {
    this.sub$.forEach((item) => item.unsubscribe());
  }
}
