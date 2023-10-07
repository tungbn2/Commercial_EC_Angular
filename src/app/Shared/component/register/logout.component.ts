import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserRegis } from 'src/app/Core/Models/user.model';
import { AuthNUserService } from 'src/app/Core/Services/Auth/auth-user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn!: ElementRef;
  UserRegis: UserRegis = {
    email: '',
    password: '',
    username: '',
  };
  constructor(private auth: AuthNUserService) {}

  ngOnInit(): void {
    this.auth.UserInfo.subscribe((data) => {
      if (data) {
        this.closeBtn?.nativeElement.click();
      }
    });
  }

  Register() {
    this.auth.Register(this.UserRegis);
  }
}
