import { ProductService } from './../../../Core/Services/Product/product.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { ItemDetail } from 'src/app/Core/Models/product.model';
import { itemInOrder } from 'src/app/Core/Models/order.model';
import { AuthNUserService } from 'src/app/Core/Services/Auth/auth-user.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() productItem!: any;
  @Input() userId!: any;

  rating(): number[] {
    let rating: number[] = [];
    for (let i = 1; i <= this.productItem.rating; i++) {
      rating.push(i);
    }
    return rating;
  }

  constructor(
    private router: Router,
    private productService: ProductService,
    private auth: AuthNUserService
  ) {}

  ngOnInit(): void {}

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

  ToProduct() {
    this.router.navigateByUrl(`/product/${this.productItem.id}`);
  }

  AddToCart() {
    let item: itemInOrder = {
      productId: this.productItem.id,
      quantity: 1,
      price: this.productItem.price,
      total: this.productItem.price * 1,
      itemInfor: {
        name: this.productItem.name,
        brand: this.productItem.brand,
        category: this.productItem.category,
        imgUrl: this.productItem.images[0]?.url || '',
        countInStock: this.productItem.countInStock,
      },
    };
    this.productService.AddItemToOrder(item);
  }
}
