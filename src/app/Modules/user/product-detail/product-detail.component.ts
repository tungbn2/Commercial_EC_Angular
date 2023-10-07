import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription, switchMap, tap } from 'rxjs';
import {
  ItemDetail,
  ReviewUpload,
  Reviews,
  ReviewDetail,
  ItemImage,
} from 'src/app/Core/Models/product.model';

import { AuthNUserService } from 'src/app/Core/Services/Auth/auth-user.service';
import { ProductService } from 'src/app/Core/Services/Product/product.service';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';

const REVIEW_ITEM = 2;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  productDetail!: ItemDetail;
  reviewData!: Reviews;
  reviewList: ReviewDetail[] = [];
  userId: number | null = null;
  productId: number = 0;
  quantity: number = 1;
  rating = 5;

  $sub: Subscription[] = [];

  constructor(
    private auth: AuthNUserService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    let routerSub = this.route.params
      .pipe(
        tap((params) => {
          this.productId = params['id'] as number;
          this.productService.GetProductById(this.productId, {
            size: REVIEW_ITEM,
          });
        })
      )
      .subscribe();

    let item$ = this.productService.ProductItem.subscribe(
      (res: any) => {
        this.productDetail = res.data.product;
        this.reviewData = res.data.reviews;
        this.reviewList = this.reviewData.result;
      },
      (error) => {
        this.toastr.error(error?.error?.message);
      }
    );

    let authSub = this.auth.UserInfo.subscribe((user) => {
      this.userId = null;
      if (user) {
        this.userId = user.id;
      }
    });

    this.$sub = [routerSub, authSub, item$];
  }

  ngOnDestroy() {
    this.$sub.forEach((item) => item.unsubscribe());
  }

  renderRating(rate: number): any {
    let result = [];
    for (let i = 0; i < 5; i++) {
      if (i < rate) {
        result.push('<i class="fas fa-star"></i>');
      } else {
        result.push('<i class="far fa-star"></i>');
      }
    }
    return result.join('');
  }

  changeQuantity(mode: 'p' | 'm') {
    switch (mode) {
      case 'p':
        this.quantity++;
        break;

      case 'm':
        this.quantity <= 1 ? this.quantity : this.quantity--;
        break;

      default:
        break;
    }
  }

  checkQuantity() {
    if (
      this.quantity <= 0 ||
      this.quantity >= (this.productDetail?.countInStock || 0)
    ) {
      this.quantity = 1;
    }
  }

  AddToCart() {
    if (!this.userId) this.auth.OpenModal.next(false);
    this.productService.AddItemToOrder({
      productId: this.productDetail.id,
      price: this.productDetail.price,
      quantity: this.quantity,
      total: this.quantity * this.productDetail.price,
      itemInfor: {
        name: this.productDetail.name,
        brand: this.productDetail.brand,
        category: this.productDetail.category,
        imgUrl: (this.productDetail.images as ItemImage[])[0]?.url || '',
        countInStock: this.productDetail.countInStock,
      },
    });
  }

  PostReview(formData: any) {
    let newReview: ReviewUpload = {
      content: formData.content,
      rating: formData.rating,
      userId: this.userId || 0,
      productId: this.productId,
    };

    this.productService.CreateReviewForProduct(newReview).subscribe(
      (data) => {
        this.reviewList.push(data.data);

        this.toastr.success('Post Review Success!');
      },
      (error) => {
        this.toastr.error(error?.error?.message);
      }
    );
  }

  GoToLogin() {
    this.auth.OpenModal.next(false);
  }

  ChangePage(page: number) {
    this.productService.GetProductById(this.productId, {
      size: REVIEW_ITEM,
      page,
    });
  }
}
