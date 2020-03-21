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

    // /** 订阅 username 数据的变化 */
    // this.loginForm.get('username').valueChanges.subscribe(username => {
    //   /** 校验用户名是否有效 */
    //   const valid = this.verifyUsername(username);
    //   if (!this.countdown) {
    //     this.setVerificationCodeButtonDisabled(!valid);
    //   }
    //
    // });
  }

  login() {
    this.userService.login(this.loginForm.value)
      .subscribe(() => {
        this.showErrorInfo = false;
        //
        // this.authService.requestCurrentLoginUser(() => {
        //   this.router.navigateByUrl('dashboard');
        // });

      }, () => {
        this.errorInfo = '登录失败，请检查您的手机号、密码、验证码';
        this.showErrorInfo = true;
      });
  }
}
