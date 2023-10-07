import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navigation-admin',
  templateUrl: './navigation-admin.component.html',
  styleUrls: ['./navigation-admin.component.css']
})
export class NavigationAdminComponent implements OnInit {
  public navigationList:Array<any> = [];
  @Output() handleCloseOverlay = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
    this.navigationList = [
      {name:'Dashboard', icon:'fas fa-tachometer-alt', navigateTo:''},
      {name:'Product', icon:'fas fa-database', idCollapse:'product', extendList: [
        {name:'Product List', navigateTo:'products'},
        {name:'Add Product', navigateTo:'products/create-product'}
      ]},
      {name:'User', icon:'fas fa-user', idCollapse:'user', extendList: [
        {name:'User List', navigateTo:'users'},
        {name:'Add User', navigateTo:'users/create-user'}
      ]},
      {name:'Orders', icon:'fas fa-shopping-cart',navigateTo:'orders'},
      {name:'Settings', icon:'fas fa-cog', navigateTo:'setting'},
    ]
  }

  onCloseOverlay(){
    setTimeout(() => {
      this.handleCloseOverlay.emit(true)
    },800)
  }


}
