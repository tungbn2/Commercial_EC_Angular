import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-alert-popup',
  templateUrl: './alert-popup.component.html',
  styleUrls: ['./alert-popup.component.css']
})
export class AlertPopupComponent implements OnInit {

  constructor() { }
  @Input() idModal:string = '';
  @Input() nameBtn:string = '';
  @Input() typeBtn:string = '';
  @Input() contentModal:string = '';
  @Input() titleModal:string = '';
  @Input() idItem!:number | any ;
  @Output() hanldeActionPopup =  new EventEmitter()
  @ViewChild('dialog') dialog !: ElementRef;
  ngOnInit(): void {
  }

  onActionPopup(id:number){
    let el = this.dialog.nativeElement;
    el.style.display = 'none'
    this.hanldeActionPopup.emit(id)
  }

}
