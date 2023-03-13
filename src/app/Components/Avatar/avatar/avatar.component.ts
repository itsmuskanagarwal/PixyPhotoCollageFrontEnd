import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent {

  files: File[] = [];
  imageSelected : boolean = false;

  constructor(
    private authService : AuthService,
    private dialogRef: MatDialogRef<AvatarComponent>){}

  onSelect(event: any) {
    
    const files: File[] = event.addedFiles;
    for (const file of files) {
      console.log(file)
      this.files.push(file);

      
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
