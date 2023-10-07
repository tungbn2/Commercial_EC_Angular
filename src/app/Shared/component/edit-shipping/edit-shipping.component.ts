import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/Core/Services/Product/product.service';

@Component({
  selector: 'app-edit-shipping',
  templateUrl: './edit-shipping.component.html',
  styleUrls: ['./edit-shipping.component.css'],
})
export class EditShippingComponent implements OnInit {
  @Input() address!: string;
  @Input() contact!: string;

  @ViewChild('closeBtn') closeBtn!: ElementRef;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  submitForm() {
    this.productService.UpdateShippingInfo(this.address, this.contact);
    this.closeBtn.nativeElement.click();
  }
}
