import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import * as ProductModel from '../../Models/product.model';
import * as OrderModel from '../../Models/order.model';
import * as UserModel from 'src/app/Core/Models/user.model';
import { API_URL } from '../../Constants/endpoint.conts';
import { Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

interface ParamProduct {
  page?: number;
  size?: number;
  keyword?: string;
  category?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private orderDetail: OrderModel.OrderCreate | null = null;
  private userId: number = 0;

  CartDetail = new BehaviorSubject<OrderModel.OrderCreate | null>(null);
  ProductsResult = new BehaviorSubject<ProductModel.Products | null>(null);
  MyOrder = new BehaviorSubject<OrderModel.MyOrders | null>(null);
  ProductItem = new Subject<any>();

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  //  order function
  CreateOrder(orderInfo: OrderModel.OrderCreate) {
    return this.http.post<any>(API_URL + 'orders', orderInfo);
  }

  MyOrders(params?: ParamProduct) {
    this.http
      .get<any>(API_URL + '/orders/my-orders', {
        params: new HttpParams({ fromObject: { ...params } }),
      })
      .subscribe(
        (res) => {
          let myOrder = res.data.orders as OrderModel.MyOrders;
          this.MyOrder.next(myOrder);
        },
        (error) => {
          this.toastr.error(error?.error?.message);
        }
      );
  }

  GetOrdersByAdmin(params: Params) {
    return this.http.get<any>(API_URL + '/orders', {
      params: new HttpParams({ fromObject: { ...params } }),
    });
  }

  GetOrderById(id: number | any) {
    return this.http.get<any>(API_URL + `/orders/${id}`);
  }

  UpdateIsPaid(id: number) {
    return this.http.patch<any>(API_URL + `/orders/paid/${id}`, {});
  }

  UpdateOrder(updateInfo: OrderModel.OrderUpdate, id: number) {
    return this.http.patch<any>(API_URL + `/orders/${id}`, updateInfo);
  }

  // Product Function
  GetAllProducts(params: Params): Observable<any> {
    return this.http.get(`${API_URL}/products`, {
      params: new HttpParams({ fromObject: { ...params } }),
    });
  }

  GetAllProductsUser(params: ParamProduct) {
    this.http
      .get<any>(`${API_URL}/products`, {
        params: new HttpParams({ fromObject: { ...params } }),
      })
      .subscribe(
        (res) => {
          let resResult = res.data;

          this.ProductsResult.next(resResult);
        },
        (error) => {
          this.toastr.error(error?.error?.message);
        }
      );
  }

  SearchProducts(params: Params): Observable<any> {
    return this.http.get<any>(`${API_URL}/search`, {
      params: new HttpParams({ fromObject: { ...params } }),
    });
  }

  SearchProductsUser(params: ParamProduct) {
    this.http
      .get<any>(`${API_URL}/search`, {
        params: new HttpParams({ fromObject: { ...params } }),
      })
      .subscribe(
        (res) => {
          let resResult = res.data.products;

          this.ProductsResult.next(resResult);
        },
        (error) => {
          this.toastr.error(error?.error?.message);
        }
      );
  }

  CreateProduct(productInfo: ProductModel.ProductCreate) {
    return this.http.post<any>(API_URL + '/products', productInfo);
  }

  GetProductById(id: number, param: ParamProduct) {
    this.http
      .get(API_URL + `/products/${id}`, {
        params: new HttpParams({ fromObject: { ...param } }),
      })
      .subscribe(
        (item) => this.ProductItem.next(item),
        (error) => {
          this.toastr.error(error?.error?.message);
          this.router.navigateByUrl('/not-found');
        }
      );
  }

  getProductById(id: number) {
    return this.http.get(API_URL + `/products/${id}`);
  }

  UpdateProductById(updateInfo: ProductModel.ProductUpdate, id: number) {
    return this.http.patch<any>(API_URL + `/products/${id}`, updateInfo);
  }

  GetAllReviewRorProduct() {}

  CreateReviewForProduct(commentData: ProductModel.ReviewUpload) {
    return this.http.post<any>(
      API_URL + `/products/${commentData.productId}/reviews`,
      commentData
    );
  }

  DeleteProductById(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/products/${id}`);
  }

  // Media function
  UpdateMedia(id: number, url: string) {
    return this.http.patch<any>(API_URL + `/media/${id}`, { url });
  }

  Upload(file: File) {
    const formData = new FormData();

    formData.append('image', file);

    return this.http.post<any>(API_URL + '/uploads', formData);
  }

  // function cart in localStorage
  CheckOrder(userInfo: UserModel.UserInfo) {
    this.userId = userInfo.id;
    this.orderDetail = localStorage.getItem(`orderOf${this.userId}`)
      ? JSON.parse(localStorage.getItem(`orderOf${this.userId}`) || '')
      : null;

    if (!this.orderDetail) {
      this.orderDetail = {
        order: {
          userId: this.userId,
          totalPrice: 0,
          address: 'Hanoi',
          contact: userInfo.contact || '',
          paymentMethod: 'Online',
        },
        itemArr: [],
      };

      localStorage.setItem(
        `orderOf${this.userId}`,
        JSON.stringify(this.orderDetail)
      );
    }

    this.CartDetail.next(this.orderDetail);
  }

  AddItemToOrder(item: OrderModel.itemInOrder) {
    let index = -1;
    let total = 0;

    this.orderDetail?.itemArr.forEach((product, i) => {
      if (product.productId == item.productId) {
        index = i;
        product.quantity += item.quantity;
        product.total = product.quantity * product.price;
      }

      total += product.total;
    });

    if (index === -1) {
      this.orderDetail?.itemArr.push(item);
      total += item.total;
    }

    this.orderDetail ? (this.orderDetail.order.totalPrice = total) : '';

    localStorage.setItem(
      `orderOf${this.userId}`,
      JSON.stringify(this.orderDetail)
    );
    this.CartDetail.next(this.orderDetail);

    this.toastr.success('Add Item Success!');
  }

  UpdateItemInOrder(item: OrderModel.itemInOrder) {
    let index = -1;
    let total = 0;

    this.orderDetail?.itemArr.forEach((product, i) => {
      if (product.productId == item.productId) {
        index = i;
        product.quantity = item.quantity;
        product.total = product.quantity * product.price;
      }

      total += product.total;
    });

    if (index === -1) {
      this.orderDetail?.itemArr.push(item);
      total += item.total;
    }

    this.orderDetail ? (this.orderDetail.order.totalPrice = total) : '';

    localStorage.setItem(
      `orderOf${this.userId}`,
      JSON.stringify(this.orderDetail)
    );
    this.CartDetail.next(this.orderDetail);
  }

  RemoveItemFromOrder(item: OrderModel.itemInOrder) {
    if (this.orderDetail) {
      this.orderDetail.itemArr = [
        ...this.orderDetail.itemArr.filter(
          (product) => product.productId !== item.productId
        ),
      ];

      this.orderDetail.order.totalPrice -= item.total;
    }

    localStorage.setItem(
      `orderOf${this.userId}`,
      JSON.stringify(this.orderDetail)
    );
    this.CartDetail.next(this.orderDetail);

    this.toastr.success('Remove Item Success!');
  }

  UpdatePaymentMethod(method: string) {
    if (this.orderDetail) this.orderDetail.order.paymentMethod = method;

    localStorage.setItem(
      `orderOf${this.userId}`,
      JSON.stringify(this.orderDetail)
    );
    this.CartDetail.next(this.orderDetail);
  }

  UpdateShippingInfo(address: string, contact: string) {
    if (this.orderDetail) {
      (this.orderDetail.order.address = address),
        (this.orderDetail.order.contact = contact);
    }

    localStorage.setItem(
      `orderOf${this.userId}`,
      JSON.stringify(this.orderDetail)
    );
    this.CartDetail.next(this.orderDetail);

    this.toastr.success('Update Shipping Information Success!');
  }

  ResetOrder(userInfo: UserModel.UserInfo) {
    this.orderDetail = {
      order: {
        userId: this.userId,
        totalPrice: 0,
        address: 'Hanoi',
        contact: userInfo.contact || '',
        paymentMethod: 'Online',
      },
      itemArr: [],
    };

    localStorage.setItem(
      `orderOf${this.userId}`,
      JSON.stringify(this.orderDetail)
    );

    this.CartDetail.next(this.orderDetail);
  }
}
