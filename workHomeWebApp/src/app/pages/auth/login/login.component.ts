import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { CommonService } from '../../../service/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /** 获取当前环境配置 */
  environment = environment;

  /** 表单对象 */
  loginForm: FormGroup;

  /** 错误信息 */
  errorInfo: string;

  /** 显示错误信息 */
  showErrorInfo: boolean;


  constructor(private userService: UserService,
              private builder: FormBuilder,
              private commonService: CommonService,
              private router: Router) {
  }

  ngOnInit() {
    /** 创建表单 */
    this.loginForm = this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  login() {
    this.userService.login(this.loginForm.value)
      .subscribe((user) => {
        console.log(user);
        this.showErrorInfo = false;
        //
        this.userService.getCurrentLoginUser(() => {
          this.router.navigateByUrl('dashboard');
        });

      }, () => {
        this.errorInfo = '登录失败，请检查您的用户名、密码';
        this.showErrorInfo = true;
      });
  }
}
