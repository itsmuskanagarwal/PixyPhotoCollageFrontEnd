import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  validPassword: boolean = true;

  constructor(
    private routes: Router,
    private ngZone: NgZone,
    private authService: AuthService

  ) {}

  msg = '';
  check(email: string, password: string) {
    
    console.log(email);
    console.log(password);

    this.authService.authenticateUser(email, password).subscribe(
      (response) => {

        console.log(response)

        if (response.email ==  email) {

          // const data = response
          // authentication successful
          localStorage.setItem('isLoggedIn', 'true');

          localStorage.setItem('userData', JSON.stringify(response));

          console.log('login', localStorage.getItem('userData'));
          console.log('login', localStorage.getItem('isLoggedIn'));

          console.log(JSON.stringify(response))

          this.routes.navigate(['/editor']);
        } else {
          // authentication failed
          this.validPassword = false;
        }
      },
      (error) => {
        console.error(error);
        this.validPassword = false;
        this.msg = 'Invalid email or password';
        // this.msg = 'An error occurred while authenticating';
      }
    );

    
  }

}
