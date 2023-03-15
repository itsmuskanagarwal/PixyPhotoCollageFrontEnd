import { Component } from '@angular/core';
import { FileUploadService } from 'src/app/Services/file-upload.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

  projects : any[] =[]

  constructor(
    private fileService : FileUploadService
  ){}

  ngOnInit(){
    
  this.fileService.getProjects().subscribe((res)=>{
    if(res){
      console.log(res)
      
    }
  },
  (error)=>{
    console.log(error)
  })
  }


}
