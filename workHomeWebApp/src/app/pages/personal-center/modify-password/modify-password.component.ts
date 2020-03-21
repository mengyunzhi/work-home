import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-modify-password',
  templateUrl: './modify-password.component.html',
  styleUrls: ['./modify-password.component.sass']
})
export class ModifyPasswordComponent implements OnInit {
  modifyPasswordForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    this.initForm();
  }

  /**
   * 初始化表单
   */
  initForm() {
    this.modifyPasswordForm = this.fb.group({
        oldPassword: [null, {
          validators: [Validators.required],
          asyncValidators: [this.userService.oldPasswordValidator()],
          updateOn: 'blur'
        }],
        newPassword: [null, [Validators.required, Validators.minLength(5)]],
        confirmNewPassword: [null, Validators.required]
      }, {validators: this.userService.confirmPasswordValidator},
    );
  }

  submit() {
    this.userService.updatePassword(this.modifyPasswordForm.get('newPassword').value,
      this.modifyPasswordForm.get('oldPassword').value)
      .subscribe(() => {
        this.userService.logout().subscribe(() => {
          this.router.navigateByUrl('/auth');
        });
      }, () => {
        console.log('修改密码失败');
      });
  }
}
