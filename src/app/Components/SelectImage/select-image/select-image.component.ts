import { Component } from '@angular/core';
import { FileUploadService } from 'src/app/Services/file-upload.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-select-image',
  templateUrl: './select-image.component.html',
  styleUrls: ['./select-image.component.css']
})
export class SelectImageComponent {

  user : any;
  images : any[] =[]
  selectedImages: any[] = [];
  count = 0

  constructor(
    private fileService: FileUploadService,
    private dialogRef: MatDialogRef<SelectImageComponent>
  ){}

  ngOnInit(){

    console.log("count: "+this.fileService.count)

    const userData = localStorage.getItem('userData');
  if (userData !== null) {
    this.user = JSON.parse(localStorage.getItem('userData') as string);
    // this.currentUser = this.user;
  }

   this.fileService.getUploadedImages(this.user._id).subscribe((res)=>{
          if(res){
            console.log(res)
            this.images =[]
            this.images = res
             console.log(this.images)
   
          }
        },
        (error)=>{
          console.log(error)
        })

        this.count = this.fileService.count

  } 

  onImageSelect(event : any) {
    const img = event.target.value;
    if (event.target.checked) {
      this.selectedImages.push(img);
    } else {
      const index = this.selectedImages.indexOf(img);
      if (index >= 0) {
        this.selectedImages.splice(index, 1);
      }
    }
  }

  onSubmit() {
    console.log("working")
    console.log('Selected Images:', this.selectedImages);

    this.fileService.selectedImages = this.selectedImages;
    this.dialogRef.close();
   
  }

}
