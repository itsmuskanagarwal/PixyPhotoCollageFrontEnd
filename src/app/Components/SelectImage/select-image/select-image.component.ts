import { Component } from '@angular/core';
import { FileUploadService } from 'src/app/Services/file-upload.service';
@Component({
  selector: 'app-select-image',
  templateUrl: './select-image.component.html',
  styleUrls: ['./select-image.component.css']
})
export class SelectImageComponent {

  user : any;
  images : any[] =[]

  constructor(
    private fileService: FileUploadService
  ){}

  ngOnInit(){

    const userData = localStorage.getItem('userData');
  if (userData !== null) {
    this.user = JSON.parse(localStorage.getItem('userData') as string);
    // this.currentUser = this.user;
  }

  this.fileService.getUploadedImages(this.user._id).subscribe((res)=>{
    this.images =[];
    this.images = res;
    console.log(this.images)
  })

  }

}
