import { Component, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AvatarComponent } from '../../Avatar/avatar/avatar.component';
// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  getId: any;
  updateForm: FormGroup | any;
  public imageUrl: string = '';
  isClicked: boolean = false;
  user : any;

  img = [
    '../assets/img1.jpg',
    '../assets/img2.jpg',
    '../assets/img3.jpg',
    '../assets/img4.jpg',
    '../assets/img5.jpg',
  ];

  constructor(
    private _snackBar: MatSnackBar,
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private authService : AuthService,
    private dialog: MatDialog
    // private http: HttpClient
  ) {
    this.updateForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: "",
      confirmPassword: "",
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(){

    console.log("flag")
    const userData = localStorage.getItem('userData');
    if (userData !== null) {
      this.user = JSON.parse(localStorage.getItem('userData') as string);
      // this.currentUser = this.user;
    }
    
    console.log(this.user)

    this.updateForm.patchValue({
      name: this.user.name,
      email: this.user.email,
    });

    }

  upload() {
    // this.isClicked = true;
    // console.log(this.isClicked);

    const dialogRef = this.dialog.open(AvatarComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  selectedAvatar(imageUrl: string) {
    console.log('selectAvatar body entered');
    // this.imageUrl = imageUrl;
    this.isClicked = false;
    // console.log(this.isClicked);
    // this.crudService
    //   .updateAvatar(this.storage.data.email, this.imageUrl)
    //   .subscribe((res) => {
    //     console.log(res);
    //   });
  }

  save(data: any) {
    if (this.updateForm.valid) {

      this.authService.updateUser(data).subscribe((response)=>{

        localStorage.setItem("userData",  JSON.stringify(data))
        this._snackBar.open(
          'Hello ' + data.display + ', Details Updated successfully!!',
          'OK',
          {
            duration: 5000,
          }
        );
      }, (error) => {
        console.error(error);
        this._snackBar.open('An error occurred', 'OK', {
          duration: 5000,
        });
      })
      
    } else {
      this._snackBar.open('Something went wrong', 'OK', {
        duration: 5000,
      });
    }
  }
  }


