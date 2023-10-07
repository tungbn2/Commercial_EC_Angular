import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdminService } from 'src/app/Core/Services/Admin/admin.service';
import * as userModule from 'src/app/Core/Models/user.model'
import { AuthNUserService } from 'src/app/Core/Services/Auth/auth-user.service';

@Component({
  selector: 'app-menubar-admin',
  templateUrl: './menubar-admin.component.html',
  styleUrls: ['./menubar-admin.component.css']
})
export class MenubarAdminComponent implements OnInit {

  @Output() handleToggleExtendView = new EventEmitter<any>();
  @Input() modeFullView:boolean = false;
  myProfile:any = {}
  constructor(private adminService:AdminService, private auth: AuthNUserService) {

  }

  ngOnInit(): void {
    this.adminService.getMyProfile().subscribe(res => {
      this.myProfile = res?.data;
    })
  }

  toggleExtendView(){
    this.handleToggleExtendView.emit();

  }

  signOut(){
    this.auth.Logout();
  }


}
