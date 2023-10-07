import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appImgErr]',
})
export class ImgErrDirective {
  @Input()
  @HostBinding('src')
  src!: string;

  @Input() appImgErr!: string;

  @HostListener('error')
  onError() {
    this.src = this.appImgErr;
  }
}
