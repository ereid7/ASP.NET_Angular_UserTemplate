import { Component  } from '@angular/core';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  constructor(public userService: UserService) { }

  public message: string
  public responseColor = 'green'

  onSubmit() {
    this.userService.register().subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.userService.registerForm.reset();
          this.responseColor = 'green'
          this.message = "Registration successful. New user profile created"
        } else {
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.responseColor = 'red'
                this.message = "Email already taken"
                break;
              default:
                this.responseColor = 'red'
                this.message = "Registration failed: " + element.description
                break;
            }
          })
        }
      },
      err => {
        console.log(err)
      }
    );
  }
}
