import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginData = {
    email: '',
    password: '',
  };

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  loginFormSubmitted(event: SubmitEvent) {
    event.preventDefault();

    console.log(this.loginData);
    if (this.loginData.email.trim() === '') {
      this.toastr.warning('Email is required !!');
      return;
    }
    if (this.loginData.password.trim() === '') {
      this.toastr.warning('Password is required !!');
      return;
    }

    this.authService
      .login(this.loginData.email, this.loginData.password)
      .then((result) => {
        //login success
        console.log(result);

        //fetch user information with userid
        this.authService
          .getUserByUserId(result.user?.uid)
          .subscribe((user: User | null) => {
            console.log(user);
            this.authService.setUserToLocalStorage(user);
            this.router.navigate(['/chat-dashboard']);
          });
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error('Error in signing in');
        this.toastr.error(error);
      });
  }
}
