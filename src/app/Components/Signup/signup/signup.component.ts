import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { user } from "src/app/Models/user";
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  formData: FormGroup | any;
  validFields: boolean = true;
  validPassword: boolean = true;
  validEmail: boolean = true;
  AllUsers : user[] = [];

  msg = {
    feilds: 'Please fill all the fields',
    password: 'Password does not match',
    email: 'Email address already exists',
  };

  constructor(
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService : AuthService
  ) {
    this.formData = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],

    });
  }

  onClickSubmit(data:any){

    console.log('signup page: ' + data.name);
    console.log('signup page: ' + data.password);

    //checking for empty feilds
    for (var key in data) {
      console.log(data[key]);
      if (data[key] == '' || data[key] == null) {
        this.validFields = false;
        break;
      } else {
        this.validFields = true;
      }
    }

    //check wether values in password and confirm password matches
    if (data.password == data.confirmPassword) {
      this.validPassword = true;
    } else {
      this.validPassword = false;
    }

    console.log(this.validEmail)
    console.log(this.validFields)
    console.log(this.validPassword)
    console.log(data)

    if(this.validEmail && this.validFields && this.validPassword){

      this.authService.register(data).subscribe(
        response => {
          console.log('User added successfully', response);
          // reset form fields

          if (response.hasOwnProperty("success")) {
            // Success key exists in response object
            console.log("Registration successful!");
            this._snackBar.open('You are sucessfully regist', 'close', {
              duration: 3000,
            });
            this.router.navigateByUrl("/login")
          } else {
            // Success key does not exist in response object
            console.log("Registration failed.");
          }          
          

        },
        error => {
          console.error('Error adding user', error);
        }
      );

    }

  }

  

}
