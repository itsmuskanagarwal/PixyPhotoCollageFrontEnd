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

  files: File[] = [];
  imageSelected : boolean = false;
  selectedimg : string ="";
  filestemp: File[] = [];
  myFile: MyFile = {} as MyFile;


  constructor(
    private authService : AuthService,
    private dialogRef: MatDialogRef<AvatarComponent>){}

  onSelect(event: any) {
    
    const files: File[] = event.addedFiles;
    for (const file of files) {
      console.log(file)
      this.files.push(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedimg = e?.target?.result as string;
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

    // this.authService.updateAvatar().subscribe((Response)=>{
    //   console.log("Profile picture updated")
    // },(error)=>{
    //   console.log(error)
    // })

    this.dialogRef.close();
  }

}
