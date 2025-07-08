import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: false,
})
export class RegisterComponent {
  user: User = new User();
  constructor(
    private toastr: ToastrService,
    private authService: AuthService
  ) {}
  formSubmit(event: SubmitEvent) {
    event.preventDefault();
    console.log(this.user);
    // validate data
    // blank name is not allowed
    if (this.user.name.trim() === '') {
      this.toastr.error('Name is required !!');
      return;
    }

    //email
    if (this.user.email.trim() === '') {
      this.toastr.error('Email is required !!');
      return;
    }

    //password
    if (this.user.password.trim() === '') {
      this.toastr.error('Password is required !!');
      return;
    }

    //about
    if (this.user.about.trim() === '') {
      this.toastr.error('About is required !!');
      return;
    }

    //form submit

    // register code goes here
    this.authService.register(this.user);
  }
}
