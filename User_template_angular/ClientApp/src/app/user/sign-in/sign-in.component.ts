import { Component } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  public message: string
  public responseColor = 'green'

  constructor(public userService: UserService, private router: Router) { }

  onSubmit() {
    this.userService.login().subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token)
        this.userService.setUserInfo()
        this.router.navigateByUrl('/home')
      },
      err => {
        if (err.status == 400) {
          this.responseColor = 'red'
          this.message = 'Incorrect email or password. Authentication failed'
        }
        else {
          console.log(err)
        }
      }
    )
  }

}
