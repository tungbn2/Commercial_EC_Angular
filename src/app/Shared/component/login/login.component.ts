import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserLogin } from 'src/app/Core/Models/user.model';
import { AuthNUserService } from 'src/app/Core/Services/Auth/auth-user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn!: ElementRef;

  isLogged = false;
  userLogin: UserLogin = {
    email: '',
    password: '',
  };

  constructor(private auth: AuthNUserService) {}

  ngOnInit(): void {
    this.auth.UserInfo.subscribe((data) => {
      if (data) {
        this.closeBtn?.nativeElement.click();
      }
    });
  }

  login() {
    this.auth.Login(this.userLogin);
  }
}
