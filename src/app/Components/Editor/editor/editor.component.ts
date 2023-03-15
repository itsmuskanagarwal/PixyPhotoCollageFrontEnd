import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { SelectImageComponent } from '../../SelectImage/select-image/select-image.component';
import { FileUploadService } from 'src/app/Services/file-upload.service'; 

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  images = [
    "./assets/user1.png",
    "./assets/contact.png",
    "./assets/logo.png",
    "./assets/signupbg.jpg"
  ];

  users : any[]=[]
  layouts :any[]=[]

  count(layout : number){

    this.showDropdown = !this.showDropdown;
    this.layouts =[]

    if(layout == 2){

      this.layouts =["./assets/2L.png","./assets/2R.png"]
    }
    else if(layout ==4){
      this.layouts =["./assets/4.png"]

    }
    else if(layout == 9){
      this.layouts =["./assets/9.png"]
    }
    else if(layout == 16){
      this.layouts =["./assets/16.png"]
    }
  }

  constructor(
    private authService : AuthService,
    private fileService : FileUploadService,
    private dialog: MatDialog,

  ){}

  showDropdown : boolean = false;

  toggleDropdown() {
    console.log(this.showDropdown)
    this.showDropdown = !this.showDropdown;
    console.log(this.showDropdown)
  }

  ngOnInit(){

    const currentUser =  JSON.parse(localStorage.getItem('userData') as string);
    this.authService.getUsers().subscribe((res)=>{
      console.log(typeof res)
      console.log(res)

      const usersArray = res.users;
      console.log(typeof usersArray);
      console.log(usersArray);
      this.users = []

      usersArray.forEach((user: any) => {

        console.log(user.email, currentUser.email)

        if(user.email !== currentUser.email){
          this.users.push(user)
        }

        
      });
    },(error)=>{
      console.log(error)
    })    
    
  }
  
addImages(){

  const dialogRef = this.dialog.open(SelectImageComponent);
  
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });

}
 
}
