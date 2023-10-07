import { AuthNUserService } from './../../../Core/Services/Auth/auth-user.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  @ViewChild('loginBtn') loginBtn!: ElementRef;
  email: string = '';

  constructor(private auth: AuthNUserService, private toastr: ToastrService) {}

  ngOnInit(): void {}

  sendNewPass() {
    this.auth.ForgotPassword(this.email).subscribe(
      (data) => {

        this.loginBtn!.nativeElement.click();
      },
      (error) => {
        this.toastr.error(error?.error?.message);
      }
    );
  }
}
