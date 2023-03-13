import { Component } from '@angular/core';

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

  users = [
    { name: 'Option 1', value: 'option1' },
    { name: 'Option 2', value: 'option2' },
    { name: 'Option 3', value: 'option3' },
  ];
  

 
}
