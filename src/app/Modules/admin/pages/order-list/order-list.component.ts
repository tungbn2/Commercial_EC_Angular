import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ngxCsv } from 'ngx-csv';
import { listOrderColumnNames } from 'src/app/Core/Constants/columnName.const';
import { ColumnField, ItemDetail } from 'src/app/Core/Models/product.model';
import { LoaderService } from 'src/app/Core/Services/Common/loader.service';
import { ProductService } from 'src/app/Core/Services/Product/product.service';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  public listOrderColumnNames:ColumnField[] = listOrderColumnNames;
  public listData:any[] = [];
  public totalItems!:number;
  public param:any = {page:1,size:10}

  constructor(private productService:ProductService, private router:Router) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(){
    this.productService.GetOrdersByAdmin(this.param).subscribe(res => {
      this.listData = res?.data?.orders?.result;
      this.totalItems = res?.data?.orders?.total;
    })
  }

  handleChangePage(param:any){
    this.param = param;
    this.getAllOrders()
  }

  onUpdateIsPaided(id:number){
    this.productService.UpdateIsPaid(id).subscribe(res => {
      let idxOrder = this.listData.findIndex((item:any, key:number) => item.id === id );
      let orderUpdate = this.listData[idxOrder];
      orderUpdate.isPaid = true
    })
  }

  handleEditOrder(id:number){
    this.router.navigateByUrl(`admin/orders/${id}`)
  }

  exportExcel(){

    var options = {
      title: 'Orders excel file',
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      useBom: true,
      headers: ['ID', 'User ID', 'Amount', 'Address', 'Contact', 'Date', 'Paided', 'Status']
    }
    let data =  [...this.listData].map((item:any) =>{
      return {
        'ID': item.id,
        'User ID': item.userId,
        'Amount': item.totalPrice,
        'Address': item.address,
        'Contact': item.contact,
        'Date': item.createdAt,
        'Paided': item.isPaid,
        'Status': item.status
       }
    })
    new ngxCsv(data, 'Report Orders', options);
  }

}
