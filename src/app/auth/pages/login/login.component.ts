import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRes } from 'src/app/shared/models/AuthRes';
import { LoginReq } from 'src/app/shared/models/LoginReq';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  submitted: boolean = false;
  err_msg: string | null = null;

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.submitted = true;
    this.err_msg = null;
    var loginReq: LoginReq = this.loginForm.value;

    this.authService.login(loginReq).subscribe({
      next: (user_full_name: string) => {
        localStorage.setItem('user_full_name', user_full_name);
        sessionStorage.setItem('logged_in', user_full_name);
        // localStorage.setItem('user', JSON.stringify(authRes));
        this.submitted = false;
        this.router.navigate(['/partner']);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.err_msg = error.error;
        this.submitted = false;
      },
    });
  }
  getErrorMessage() {
    this.loginForm.controls['username'];
    if (this.loginForm.controls['username'].hasError('required')) {
      return 'You must enter an username';
    }

    return '';
  }
}
