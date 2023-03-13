import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

  images = [
    "./assets/user1.png",
    "./assets/contact.png",
    "./assets/logo.png",
    "./assets/signupbg.jpg",
    "./assets/user1.png",
    "./assets/contact.png",
    "./assets/logo.png",
    "./assets/signupbg.jpg"
  ];

  projects = 1;

}
