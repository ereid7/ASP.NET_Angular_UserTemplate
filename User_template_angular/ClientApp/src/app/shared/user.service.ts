import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService  {
  // TODO set this to actual api url once deployed
  readonly rootUrl = 'https://localhost:44355'
  public userDetails


  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  registerForm = this.fb.group({
    Email: ['', [Validators.required, Validators.email]],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(8)]],
      ConfirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    }, { validator : this.comparePasswords })
  })

  loginForm = this.fb.group({
    Email: ['', [Validators.required]],
    Password: ['', [Validators.required]]
  })

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');

    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value) {
        confirmPswrdCtrl.setErrors({ passwordMismatch: true })
      } else {
        confirmPswrdCtrl.setErrors(null)
      }
    }
  }

  register() {
    var body = {
      UserName: this.registerForm.value.Email,
      Password: this.registerForm.value.Passwords.Password
    }
    return this.http.post(this.rootUrl + '/api/ApplicationUser/Register', body)
  }

  login() {
    var body = {
      UserName: this.loginForm.value.Email,
      Password: this.loginForm.value.Password
    }
    return this.http.post(this.rootUrl + '/api/ApplicationUser/Login', body)
  }

  isLogged() {
    return localStorage.getItem('token') != null
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/signin']);
    this.userDetails = null
  }

  getUserProfile() {
    var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') })
    return this.http.get(this.rootUrl + '/api/UserProfile', { headers: tokenHeader })
  }

  setUserInfo() {
    this.getUserProfile().subscribe(
      res => {
        this.userDetails = res
      },
      err => {
        console.log(err)
      }
    );
  }
}
