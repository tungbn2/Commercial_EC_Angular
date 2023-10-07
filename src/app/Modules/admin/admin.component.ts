import { Component, OnInit } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  modeFullView:boolean = false;
  desktopResponStatus:boolean = false;
  resizeObservable$!: Observable<Event>
  resizeSubscription$!: Subscription
  constructor() { }

  ngOnInit(): void {
    if(window.innerWidth < 1280){
      this.modeFullView = true;
      this.desktopResponStatus = true
    }else {
      this.modeFullView = false;
      this.desktopResponStatus = false
    }

    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$.subscribe( (evt:Event) => {
      const w = evt.target as Window;
      if(w?.innerWidth < 1280){
        this.modeFullView = true;
        this.desktopResponStatus = true
      }else {
        this.modeFullView = false;
        this.desktopResponStatus = false
      }
    })

  }
  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe()
  }

  toggleExtend(){
    this.modeFullView = !this.modeFullView;
  }


}
