import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserInfo } from 'src/app/Core/Models/user.model';
import { AuthNUserService } from 'src/app/Core/Services/Auth/auth-user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  userInfo: UserInfo | null = null;

  private sub$: Subscription[] = [];

  constructor(private auth: AuthNUserService) {}

  ngOnInit(): void {
    let auth$ = this.auth.UserInfo.subscribe((user) => {
      this.userInfo = user;
    });

    this.sub$ = [auth$];
  }

  ngOnDestroy() {
    this.sub$.forEach((item) => item.unsubscribe());
  }

  Logout() {
    this.auth.Logout();
  }

  VerifyEmail() {
    this.auth.SendVerifyEmail();
  }
}
