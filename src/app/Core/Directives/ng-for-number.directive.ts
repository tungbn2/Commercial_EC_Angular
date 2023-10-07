import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appNgForNumber]',
})
export class NgForNumberDirective implements OnChanges {
  @Input() number!: number;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.number) {
      // clear all
      this.viewContainerRef.clear();

      // create a new view
      for (let i = 0; i <= this.number; i++) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    }
  }
}
