import { Component, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { SelectImageComponent } from '../../SelectImage/select-image/select-image.component';
import { FileUploadService } from 'src/app/Services/file-upload.service';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent {
  
  images: any[] = [];
  users: any[] = [];
  layouts: any[] = [];
  @ViewChild('borderSlider', { static: false }) borderSlider !: ElementRef;
  selectedColor: string = "";
  border = ""
  color = '#5aa8e7';
  msg = ""


  count(layout: number) {
    this.showDropdown = !this.showDropdown;
    this.layouts = [];

    if (layout == 2) {
      this.layouts = ['./assets/2L.png', './assets/2R.png'];
      this.fileService.count = 2;
    } else if (layout == 4) {
      this.layouts = ['./assets/4.png'];
      this.fileService.count = 4;
    } else if (layout == 9) {
      this.layouts = ['./assets/9.png'];
      this.fileService.count = 9;
    } else if (layout == 16) {
      this.layouts = ['./assets/16.png'];
      this.fileService.count = 16;
    }
  }

  constructor(
    private authService: AuthService,
    private fileService: FileUploadService,
    private dialog: MatDialog
  ) {}

  showDropdown: boolean = false;

  toggleDropdown() {
    console.log(this.showDropdown);
    this.showDropdown = !this.showDropdown;
    console.log(this.showDropdown);
  }



  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('userData') as string);
    this.authService.getUsers().subscribe(
      (res) => {
        console.log(typeof res);
        console.log(res);

        const usersArray = res.users;
        console.log(typeof usersArray);
        console.log(usersArray);
        this.users = [];

        usersArray.forEach((user: any) => {
          console.log(user.email, currentUser.email);

          if (user.email !== currentUser.email) {
            this.users.push(user);
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getDataFromSlider() {
    const borderValue = this.borderSlider.nativeElement.value;
    this.border =  borderValue
    console.log('Border value:', borderValue);
    console.log(typeof borderValue);
  }

  onColorChange(newColor: string) {
    console.log(newColor); // prints the selected color in hex format
    this.selectedColor = newColor
  }


  addImages() {
    const dialogRef = this.dialog.open(SelectImageComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.images = [];
      this.images = this.fileService.selectedImages;
      console.log('image :' + this.images);
    });
  }

  createCollage(){

    console.log(this.selectedColor)
    console.log(this.images )
    console.log(this.border)

    // if(!this.selectedColor || !this.images.length  || !this.borderValue){
    //   this.msg="Please check all the fields"
    // }

    // else{

    //   this.msg="good"
    // }
    
  }
}
