import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

isLoggedIn : boolean = false;
user : any;

constructor(private router : Router) {
  
}

ngOnInit(){
  console.log("flag")
  const userData = localStorage.getItem('userData');
  if (userData !== null) {
    this.user = JSON.parse(localStorage.getItem('userData') as string);
    // this.currentUser = this.user;
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
