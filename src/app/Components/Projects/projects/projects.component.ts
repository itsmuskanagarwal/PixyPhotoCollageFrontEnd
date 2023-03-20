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
  user: any;

  constructor(private fileService: FileUploadService,
    private snackBar : MatSnackBar) {}

  ngOnInit() {
    const userData = localStorage.getItem('userData');
    if (userData !== null) {
      this.user = JSON.parse(localStorage.getItem('userData') as string);
    }

    this.fileService.getProjects(this.user._id).subscribe(
      (res) => {
        if (res) {
          console.log(res);
          console.log(typeof res);
          this.projects = [];
          this.projects = res;
          console.log(this.projects);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  } 
  

  deleteProject(filename: any) {
    console.log(filename);

    this.fileService.deleteProject(filename).subscribe(
      (res) => {
        console.log('deleted sucessfully');

        this.fileService.getProjects(this.user._id).subscribe(
          (res) => {
            if (res) {
              console.log(res);
              this.projects = [];
              this.projects = res;
              console.log(this.projects);
            }
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async downloadProject(imagePath: string) {
    console.log("download function");
    console.log(imagePath);
  
    const response = await fetch(`http://localhost:3000/public/projects/${imagePath}`);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    const fileName = imagePath.substring(imagePath.lastIndexOf('/') + 1);
    link.download = fileName;
    link.href = url;
  
    console.log(link);
    console.log(fileName);
  
    link.addEventListener('load', () => {
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    });
  
    document.body.appendChild(link);
  
    link.click();
  }

  sendMail(image: string): void {

    const projectImage = image;
    const currentUser = this.user.email;

    console.log(projectImage)
    console.log(currentUser)
  
    this.fileService.sendMail(currentUser, projectImage).subscribe((res) => {
      this.snackBar.open('Project file sent successfully', 'Close', {
        duration: 1000,
      });
    });
  }
  
}
