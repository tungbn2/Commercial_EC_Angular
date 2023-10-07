import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, forkJoin, Subject } from 'rxjs';
import { listProductColumnNames } from 'src/app/Core/Constants/columnName.const';
import { ColumnField, ItemDetail } from 'src/app/Core/Models/product.model';
import { LoaderService } from 'src/app/Core/Services/Common/loader.service';
import { ProductService } from 'src/app/Core/Services/Product/product.service';
import { productSchema } from 'src/app/Core/Constants/schemaReadExcel.const';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import readXlsxFile from 'read-excel-file'
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  public listProductColumnNames: ColumnField[] = listProductColumnNames;
  public listData: ItemDetail[] = [];
  public listAllData: ItemDetail[] = [];
  public totalItems!: number;
  public keywordSearch!:string;
  public param: any = { page: 1, size: 10 };

  constructor(
    private productService: ProductService,
    private loaderService: LoaderService,
    private toastr: ToastrService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.GetAllProducts(this.param).subscribe(
      (res) => {
        this.listData = res?.data?.result;
        this.totalItems = res?.data?.total;
        this.getAllProduct()
      },
      (error) => {
        this.toastr.error(error?.error?.message);
      }
    );
  }

  getAllProduct(){
    this.productService.GetAllProducts({page:1, size: this.totalItems}).subscribe(res => {
      this.listAllData = res?.data?.result
    })
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

  handleSearchProduct(keyword: string) {
    if (keyword?.length === 0) {
      this.getProducts();
      this.keywordSearch = ''
      return;
    }
    this.keywordSearch = keyword;
    this.productService.SearchProducts({keyword, size: this.param.size, page:this.param.page}).subscribe(
      (res) => {
        this.listData = res?.data?.products?.result;
        this.totalItems = res?.data?.products?.total;
      },
      (error) => {
        this.toastr.error(error?.error?.message);
      }
    );
  }

  handleDeleteById(id: number) {
    this.productService.DeleteProductById(id).subscribe(
      (res) => {
        this.listData = [...this.listData].filter(
          (item: ItemDetail, key: number) => item.id !== id
        );
        this.toastr.success('Delete product # ' + id + ' success !');
      },
      (error) => {
        this.toastr.error(error?.error?.message);
      }
    );
  }

  handleEditById(id:number){
    this.router.navigateByUrl(`admin/products/${id}/update`)
  }

  handleChangePage(param:any){
    this.param = param;
    if(this.keywordSearch?.length > 0){
      this.handleSearchProduct(this.keywordSearch)
    }else {
      this.getProducts();
    }

  }

  onExportExcel(){
    var options = {
      title: 'Products excel file',
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      useBom: true,
      headers: ['ID', 'Name', 'Brand', 'Category', 'Description', 'Price', 'Rating', 'Number of reviews', 'Stock', 'Create At', 'Update At', 'Image Urls']
    }
    let data =  [...this.listAllData].map((item:any) =>{
      return {...item, images: item.images[0].url || 'Not image found !' }
    })
    new ngxCsv(data, 'Report Products', options);
  }

  onReadExcel(evt:any){
    this.loaderService.show()
    const schema = productSchema;
    readXlsxFile(evt.target.files[0], {schema} ).then(({ rows, errors }) => {
      console.log(rows);
      return rows.map((item:any) => {
        return this.productService.CreateProduct(item)
      })
    })
    .then(listObservable => forkJoin(listObservable).subscribe(res => {
      this.toastr.success('Import excel file success !');
      this.getProducts();
    }))
    .catch((err:Error) => {
      this.toastr.error('Import excel file failed !')
    })
    .finally(() => {
      setTimeout(() => {
        this.loaderService.hide()
      }, 1500);
    })
  }

}
