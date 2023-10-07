import { Subscription } from 'rxjs';
import { Categories } from 'src/app/Core/Constants/other.conts';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthNUserService } from 'src/app/Core/Services/Auth/auth-user.service';
import { ProductService } from 'src/app/Core/Services/Product/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLogged = true;
  avartarUrl: string = '';
  Categories = Categories;

  searchInput: string = '';

  AmoutInCart: number = 0;

  @ViewChild('loginBtn') loginBtn!: ElementRef;

  private sub$: Subscription[] = [];

  constructor(
    private auth: AuthNUserService,
    private product: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let auth$ = this.auth.UserInfo.subscribe((user) => {
      this.isLogged = !!user;
      this.avartarUrl = user?.avatar || '';
    });

    let product$ = this.product.CartDetail.subscribe((cart) => {
      this.AmoutInCart = cart
        ? cart.itemArr.reduce((total, product) => {
            total += product.quantity;
            return total;
          }, 0)
        : 0;
    });

    let OpenModal$ = this.auth.OpenModal.subscribe((isOpen) => {
      if (!isOpen) {
        this.loginBtn?.nativeElement.click();
      }
    });

    this.sub$.push(auth$);
    this.sub$.push(product$);
    this.sub$.push(OpenModal$);
  }

  ngOnDestroy(): void {
    this.sub$.forEach((item) => item.unsubscribe());
  }

  SearchProduct() {
    this.searchInput
      ? this.router.navigateByUrl(`/search/${this.searchInput}`)
      : this.router.navigateByUrl('/');

    this.searchInput = '';
  }

  OpenModalLogin() {
    this.loginBtn.nativeElement.click();
  }

  Logout() {
    this.auth.Logout();
  }
  onMoveToProfilePage(){
    this.router.navigateByUrl('my-profile')
  }
}
