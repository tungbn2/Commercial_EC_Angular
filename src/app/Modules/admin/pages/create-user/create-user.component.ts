import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { UserCreate, UserInfo } from 'src/app/Core/Models/user.model';
import { AdminService } from 'src/app/Core/Services/Admin/admin.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  private unSaved: boolean = true;

  public userForm!: FormGroup;
  public isEditMode: boolean = false;
  public userId!: number;
  public userUpdate!: UserCreate;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private adminService: AdminService,
    private router: Router,
    private _route: ActivatedRoute
  ) {}

  canDeactivate(): Observable<boolean> | boolean {
    if (this.unSaved && this.userForm.dirty) {
      const result = window.confirm('There are unsaved changes! Are you sure?');
      return of(result);
    }
    return true;
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['', Validators.required],
    });
    this._route.paramMap.subscribe((params) => {
      const userId = params.get('id');
      if (userId) {
        this.isEditMode = true;
        this.adminService.GetUserById(userId).subscribe(
          (res) => {
            this.userId = +userId;
            this.userUpdate = {
              username: res?.data?.username,
              email: res?.data?.email || '',
              password: res?.data?.password || '',
              role: res?.data?.role,
            };
            this.userForm.patchValue(this.userUpdate);
          },
          (err) => {
            this.router.navigateByUrl('not-found');
          }
        );
      }
    });
  }
  // check valid field
  public isFieldValid(field: string) {
    return this.userForm.get(field)?.dirty && this.userForm.invalid;
  }
  // catch error of field
  public isFieldHasError(field: string, error: string) {
    return this.userForm.get(field)?.hasError(error);
  }

  public onSaveUser() {
    if (this.isEditMode) {
      if (this.userUpdate.email === this.userForm.value?.email) {
        delete this.userForm.value?.email;
      }
      this.adminService
        .updateUserById(this.userForm.value, this.userId)
        .subscribe(
          (res) => {
            this.toastr.success('Update user #' + this.userId + ' success !');
            this.unSaved = false;
            this.router.navigateByUrl('admin/users');
          },
          (err) => {
            this.toastr.error('Update user #' + this.userId + ' failed !');
          }
        );
    } else {
      this.adminService.CreateUser(this.userForm.value).subscribe(
        (res) => {
          this.toastr.success('Add user success !');
          this.userForm.reset();
        },
        (err) => {
          this.toastr.error('Add user failed !');
        }
      );
    }
  }
}
