import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';

interface MyFile extends File {
  url: string | ArrayBuffer | null;
}

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})

export class AvatarComponent {

  user: any;
  files: File[] = [];
  imageSelected : boolean = false;
  selectedimg : string ="";
  filestemp: File[] = [];
  myFile: MyFile = {} as MyFile;
  imageFile: File = {} as File;



  constructor(
    private authService : AuthService,
    private dialogRef: MatDialogRef<AvatarComponent>){}

    ngOnInit() {
      const userData = localStorage.getItem('userData');
      if (userData !== null) {
        this.user = JSON.parse(localStorage.getItem('userData') as string);
        // this.currentUser = this.user;
      }
    }

    onSelect(event: any) {
    
      const files: File[] = event.addedFiles;
      for (const file of files) {
        console.log(file)
        this.files.push(file);
  
        const reader = new FileReader();
        reader.onload = (e) => {
          this.selectedimg = e?.target?.result as string;
          // store the selected image in a variable
          this.imageFile = file;
        }
        reader.readAsDataURL(file);
      }
      this.imageSelected = true
      console.log(files)
    }
  

  onRemove(event: any) {

    const index = this.files.indexOf(event);
    if (index !== -1) {
      this.files.splice(index, 1);
    }
  }

  uploadFiles(){   
    console.log("upload button")

    const formData = new FormData();

    for (let i = 0; i < this.files.length; i++) {
      const file = this.files[i];
      console.log('file: ' + file);
      
      formData.append('images', file, file.name);
      console.log('formdata: ' + formData);
    }

    console.log(formData)
    
    console.log(this.user.name);
    console.log(this.user._id);
    console.log(this.files);

    this.authService.updateAvatar(this.user._id, formData).subscribe((Response)=>{
      console.log("Profile picture updated")
    },(error)=>{
      console.log(error)
    })

    this.dialogRef.close();
  }

}
