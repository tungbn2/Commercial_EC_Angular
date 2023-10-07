import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthNUserService } from 'src/app/Core/Services/Auth/auth-user.service';

interface dataChange {
  username: string;
  contact?: string;
  avatar?: string;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit, OnDestroy {

  @ViewChild('closeBtn') closeBtn!: ElementRef;
  @ViewChild('avatarInput') avatarInput!: NgModel;

  changeData = {
    username: '',
    contact: '',
    avatar: '',
  };

  private oldData = {
    username: '',
    contact: '',
  };

  userId: number = 0;

  fileUploaded: boolean = false;

  private sub$: Subscription[] = [];

  constructor(
    private http: HttpClient,
    private auth: AuthNUserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    let auth$ = this.auth.UserInfo.subscribe((user) => {
      if (user) {
        this.changeData.username = user.username;
        this.changeData.contact = user.contact || '';
        this.userId = user.id;

        this.oldData = {
          username: user.username,
          contact: user.contact || '',
        };
      }
    });

    this.sub$ = [auth$];
  }

  ngOnDestroy() {
    this.sub$.forEach((item) => item.unsubscribe());
  }

  submitForm() {
    if (this.changeData.username !== this.oldData.username)
      this.auth.ChangeUsername(this.changeData.username);

    if (this.changeData.contact !== this.oldData.contact)
      this.auth.ChangeContact(this.changeData.contact);

    if (this.changeData.avatar) this.auth.ChangeAvatar(this.changeData.avatar);

    this.avatarInput.reset();
    this.fileUploaded = false;
    this.closeBtn.nativeElement.click();
  }

  UploadFile(event: any) {
    const file: File = event.target.files[0];

    this.auth.UploadFile(file).subscribe(
      (res) => {
        this.changeData.avatar = res.data.imageURL;
        this.fileUploaded = true;
      },
      (error) => {
        this.toastr.error(error?.error?.message);
        this.fileUploaded = false;
      }
    );
  }
}
