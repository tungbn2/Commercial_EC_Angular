import { Component, OnInit } from '@angular/core';
import { AuthNUserService } from './Core/Services/Auth/auth-user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(private auth: AuthNUserService) {}

  ngOnInit() {
    this.auth.CheckLogin();
  }

}

