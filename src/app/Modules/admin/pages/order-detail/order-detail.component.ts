import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, switchMap } from 'rxjs';
import { listOrderItemsColumnNames } from 'src/app/Core/Constants/columnName.const';
import { itemInOrder, OrderDetail } from 'src/app/Core/Models/order.model';
import { ColumnField } from 'src/app/Core/Models/product.model';
import { UserInfo } from 'src/app/Core/Models/user.model';
import { AdminService } from 'src/app/Core/Services/Admin/admin.service';
import { ProductService } from 'src/app/Core/Services/Product/product.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  public listOrderItemsColumnNames:ColumnField[] = listOrderItemsColumnNames;
  public listItem:itemInOrder[] = [];
  public orderDetails$!:Observable<any>
  public order!:OrderDetail;
  public customerInfor!:UserInfo;
  public orderForm!:FormGroup;

  constructor(
    private productService: ProductService,
    private _route:ActivatedRoute,
    private router:Router,
    private userService:AdminService,
    private fb:FormBuilder,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.orderDetails$ = this._route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => this.productService.GetOrderById(id))
    );

    this.orderDetails$.subscribe(
      res => {
        this.order = res?.data?.order;
        this.listItem = res?.data?.items;
        this.orderForm.patchValue({
          status: this.order?.status,
          isPaid: this.order?.isPaid
        })
        this.userService.GetUserById(this.order?.userId).subscribe(res => {
          this.customerInfor = res?.data
        })
      },
      (err:Error) => {
        this.router.navigateByUrl('not-found')
    })

    this.orderForm = this.fb.group({
      'status': ['', Validators.required],
      'isPaid': ['', Validators.required]
    })

  }
  // check valid field
  isFieldValid(field:string) {
    return (this.orderForm.get(field)?.dirty ) && this.orderForm.invalid ;
  }
  // catch error of field
  isFieldHasError(field:string, error:string) {
    return this.orderForm.get(field)?.hasError(error);
  }

  onUpdateOrder(id:number){
    this.productService.UpdateOrder(this.orderForm.value, this.order.id).subscribe(res => {
      this.toastrService.success('Update Order #' + this.order.id + 'success !');
      this.router.navigateByUrl('admin/orders')
    }, err => {
      this.toastrService.error('Update Order #' + this.order.id + 'error !')
    })

  }
}
