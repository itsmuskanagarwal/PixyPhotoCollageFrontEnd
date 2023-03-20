import { Component } from '@angular/core';
import { FileUploadService } from 'src/app/Services/file-upload.service';
import html2canvas from 'html2canvas';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {

  projects: any[] = [];
  user : any;

  constructor(private fileService: FileUploadService) {}

  ngOnInit() {
    const userData = localStorage.getItem('userData');
    if (userData !== null) {
      this.user = JSON.parse(localStorage.getItem('userData') as string);
    }

    this.fileService.getProjects(this.user._id).subscribe(
      (res) => {
        if (res) {
          console.log(res);
          console.log(typeof res)
        this.projects =[]
        this.projects = res
         console.log(this.projects)
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  downloadImage() {
    const selectedImage = document.querySelector('.finalimg') as HTMLImageElement;
    console.log(selectedImage)

    if (selectedImage) {
      console.log(selectedImage)
      const link = document.createElement('a');
      link.download = 'selected-image.png';
  
      // Attach a listener to the anchor's load event
      link.addEventListener('load', () => {
        link.click();
        document.body.removeChild(link);
      });
  
      // Trigger the load event by setting the anchor's href attribute
      link.href = selectedImage.src;
  
      // Append the anchor to the document
      document.body.appendChild(link);
    }
  }
  
  deleteProject(filename:string){
    console.log(filename)

    this.fileService.deleteUploadedImages(filename).subscribe((res)=>
    {
      console.log("deleted sucessfully")

      this.fileService.getUploadedImages(this.user._id).subscribe((res)=>{
        if(res){
          console.log(res)
          this.projects =[]
          this.projects = res
           console.log(this.projects)
        }
      },
      (error)=>{
        console.log(error)
      })

    },(error)=>{
      console.log(error)
    })
  }
  
}
