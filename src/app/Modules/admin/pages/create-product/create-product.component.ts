import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { ProductService } from 'src/app/Core/Services/Product/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  private unSaved: boolean = true;

  public productForm!: FormGroup;
  public isEditMode: boolean = false;
  public productId!: number;
  public imageFiles: string[] = [];

  @ViewChild('fileImage') fileInputElement!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private _route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  canDeactivate(): Observable<boolean> | boolean {
    if (this.unSaved && this.productForm.dirty) {
      const result = window.confirm('There are unsaved changes! Are you sure?');

      return of(result);
    }
    return true;
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      rating: ['', Validators.required],
      countInStock: ['', Validators.required],
      imageUrls: [[]],
    });
    this._route.paramMap.subscribe((params) => {
      const productId = params.get('id');
      if (productId) {
        this.productId = +productId;
        this.isEditMode = true;
        this.productService.getProductById(+productId).subscribe(
          (res: any) => {
            let productInfo = {
              name: res?.data?.product?.name,
              description: res?.data?.product?.description,
              price: res?.data?.product?.price,
              brand: res?.data?.product?.brand,
              category: res?.data?.product?.category,
              rating: res?.data?.product?.rating,
              countInStock: res?.data?.product?.countInStock,
            };
            this.productForm.patchValue(productInfo);
          },
          (err: Error) => {
            this.router.navigateByUrl('not-found');
          }
        );
      }
    });
  }

  // check valid field
  public isFieldValid(field: string) {
    return this.productForm.get(field)?.dirty && this.productForm.invalid;
  }
  // catch error of field
  public isFieldHasError(field: string, error: string) {
    return this.productForm.get(field)?.hasError(error);
  }

  onSaveProduct(id: number) {
    if (this.isEditMode) {
      delete this.productForm.value?.imageUrls;
      this.productService
        .UpdateProductById(this.productForm.value, this.productId)
        .subscribe(
          (res) => {
            this.toastr.success(
              'Update product #' + this.productId + ' success !'
            );
            this.unSaved = false;
            this.router.navigateByUrl('admin/products');
          },
          (err) => {
            this.toastr.error(
              'Update product #' + this.productId + ' failed !'
            );
          }
        );
    } else {
      this.productService
        .CreateProduct({
          ...this.productForm.value,
          imageUrls: this.imageFiles,
        })
        .subscribe(
          (res) => {
            this.toastr.success('Add product success !');
            this.productForm.reset();
            this.imageFiles = [];
          },
          (err) => {
            this.toastr.error('Add product failed !');
          }
        );
    }
  }

  onChangeImage(event: any) {
    if (event?.target?.files && event.target.files.length > 0) {
      for (var i = 0; i < event.target.files.length; i++) {
        this.productService.Upload(event.target.files[i]).subscribe((res) => {
          this.imageFiles.push(res?.data?.imageURL);
        });
      }
    }
  }

  onDeleteImageFile(image: string) {
    this.imageFiles = [...this.imageFiles].filter(
      (item: any) => item !== image
    );
    this.productForm.patchValue({
      imageUrls: [],
    });
  }
}
