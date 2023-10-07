import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { listUserColumnNames } from 'src/app/Core/Constants/columnName.const';
import { ColumnField, ItemDetail } from 'src/app/Core/Models/product.model';
import { AdminService } from 'src/app/Core/Services/Admin/admin.service';
import { ProductService } from 'src/app/Core/Services/Product/product.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { LoaderService } from 'src/app/Core/Services/Common/loader.service';
import readXlsxFile from 'read-excel-file';
import { forkJoin } from 'rxjs';
import { userSchema } from 'src/app/Core/Constants/schemaReadExcel.const';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public listUserColumnNames:ColumnField[] = listUserColumnNames;
  public listData:ItemDetail[] = [];
  public listAllData:ItemDetail[] = [];
  public totalItems!:number;
  public totalPages!:number;
  public param:any = {page:1,size:10}

  constructor(
    private userService:AdminService,
    private router:Router,
    private toastrService:ToastrService,
    private loaderService:LoaderService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.userService.QueryUser(this.param).subscribe(res => {
      this.listData = res?.data?.result;
      this.totalItems = res?.data?.total;
      this.totalPages = res?.data?.totalPages
      this.getAllUser()
    })
  }

  getAllUser(){
    this.userService.QueryUser({...this.param, size: this.totalItems}).subscribe(res => {
      this.listAllData = res?.data?.result;
    })
  }

  handleDeleteById(id:number){
    this.userService.deleteUserById(id).subscribe(res => {
      this.listData = [...this.listData].filter((item:ItemDetail, key:number) => item.id !== id)
      this.toastrService.success('Delete User # ' + id + ' success !');
    },err => {
      this.toastrService.error('Delete User # ' + id + ' failed !')
    })
  }

  handleEditById(id:number){
    this.router.navigateByUrl(`admin/users/${id}/update`)
  }

  handleChangePage(param:any){
    this.param = param;
    this.getUsers()
  }

  onMoveToDetailPage(id:number){
    this.router.navigateByUrl(`admin/users/${id}`)
  }

  exportExcel(){
    var options = {
      title: 'User excel file',
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      useBom: true,
      headers: ['ID', 'Username', 'Email', 'Avatar Url', 'Role', 'Registered', 'Contact', 'Status', 'Verify Email', 'Verify Contact']
    }
    let data =  [...this.listAllData].map((item:any) =>{
      return {
        'ID': item.id,
        'Username': item.username,
        'Email': item.email,
        'Avatar Url':item.avatar,
        'Role': item.role,
        'Registered': item.createdAt,
        'Contact':item.contact,
        'Status': item.isActive,
        'Verify Email': item.isEmailVerified,
        'Verify Contact': item.isContactVerified
       }
    })
    new ngxCsv(data, 'Report Users', options);
  }

  onReadExcel(evt:any){
    this.loaderService.show()
    const schema = userSchema;
    readXlsxFile(evt.target.files[0], {schema} ).then(({ rows, errors }) => {
      console.log(rows);
      return rows.map((item:any) => {
        return this.userService.CreateUser(item)
      })
    })
    .then(listObservable => forkJoin(listObservable).subscribe(res => {
      this.toastrService.success('Import excel file success !');
      this.getUsers();
    }))
    .catch((err:Error) => {
      this.toastrService.error('Import excel file failed !')
    })
    .finally(() => {
      setTimeout(() => {
        this.loaderService.hide()
      }, 1500);
    })
  }
}
