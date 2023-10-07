import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.css'],
})
export class ConfirmPopupComponent implements OnInit {
  @Input() contentModal: string = '';
  @Input() titleModal: string = '';

  @Output() hanldeActionPopup = new EventEmitter<boolean>();

  ngOnInit(): void {}

  onActionPopup() {
    this.hanldeActionPopup.emit(true);
  }
}
