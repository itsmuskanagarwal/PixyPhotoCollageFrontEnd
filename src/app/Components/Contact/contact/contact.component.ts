import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup | any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: '',
      email: '',
      message: '',
    });
  }

  onSubmit(data: any) {
    console.log(this.contactForm.value);

    this.authService.addQuery(data).subscribe(
      (response) => {

        console.log(response)
        this._snackBar.open(
          'Hello ' + data.name + ', Your query is submitted !!',
          'OK',
          {
            duration: 5000,
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
