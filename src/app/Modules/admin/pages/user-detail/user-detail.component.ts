import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { UserInfo } from 'src/app/Core/Models/user.model';
import { AdminService } from 'src/app/Core/Services/Admin/admin.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  public userDetail$!:Observable<any>
  public user!:UserInfo;
  constructor(
    private _route:ActivatedRoute,
    private userService:AdminService,
    private router:Router,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.userDetail$ = this._route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => this.userService.GetUserById(id))
    );
    this.userDetail$.subscribe(
      res => {
        this.user = res?.data;

      },
      (err:Error) => {
        this.router.navigateByUrl('not-found')
      })

  }
  // onDeleteItem(id:number){
  //   this.userService.deleteUserById(id).subscribe(res => {
  //     this.toastrService.success('Delete User # ' + this.user?.id + ' success !');
  //     setTimeout(() => {
  //       this.router.navigateByUrl('admin/users');
  //       let modal = document.getElementsByClassName('modal-backdrop');
  //       modal[0].classList.add('hidden')

  //     }, 0);
  //   },err => {
  //     this.toastrService.error('Delete User # ' + this.user?.id + ' failed !')
  //   })

  // }

}
