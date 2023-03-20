import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

isLoggedIn : boolean = false;
user : any;
public imageUrl: string = '';

constructor(
  private router : Router,
  private authService : AuthService) {
  
}

ngOnInit(){
  console.log("flag")
  const userData = localStorage.getItem('userData');
  if (userData !== null) {
    this.user = JSON.parse(localStorage.getItem('userData') as string);
    // this.currentUser = this.user;

    this.authService.findUserAvatar(this.user._id).subscribe((res)=>{
      console.log(res)
      this.imageUrl = res.toString()
      console.log(this.imageUrl)
      console.log(this.user._id)
    })
  }

}

ngDoCheck(){
  if(localStorage.getItem("isLoggedIn")){
    this.isLoggedIn = true
    console.log(this.isLoggedIn)

    const userData = localStorage.getItem('userData');
    if (userData !== null) {
      this.user = JSON.parse(localStorage.getItem('userData') as string);
      // this.currentUser = this.user;

      // this.authService.findUserAvatar(this.user._id).subscribe((res)=>{
      //   console.log(res)
      //   this.imageUrl = res.toString()
      //   console.log(this.imageUrl)
      //   console.log(this.user._id)
      // })
    }
  }
  else{
    this.isLoggedIn = false
    console.log(this.isLoggedIn)
  }
}

logout(){
  localStorage.removeItem("isLoggedIn")
  localStorage.removeItem("userData")
  this.router.navigateByUrl('/landing');
  
}

}
