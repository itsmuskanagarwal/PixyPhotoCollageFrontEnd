import { Component } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { FileUploadService } from 'src/app/Services/file-upload.service';
import { user } from 'src/app/Models/user';

interface MyFile extends File {
  url: string | ArrayBuffer | null;
}

@Component({
  selector: 'app-image-library',
  templateUrl: './image-library.component.html',
  styleUrls: ['./image-library.component.css'],
})
export class ImageLibraryComponent {
  uploadProgress = -1;
  uploadButtonName = 'Upload';
  user: any;

  files: File[] = [];
  filestemp: File[] = [];
  imgList: string[] = [];
  selectedFiles: any[] = [];
  myFile: MyFile = {} as MyFile;

  constructor(private fileService: FileUploadService) {}

  ngOnInit() {
    const userData = localStorage.getItem('userData');
    if (userData !== null) {
      this.user = JSON.parse(localStorage.getItem('userData') as string);
      // this.currentUser = this.user;
    }

    console.log(this.user);
  }

  onSelect(event: any) {
    this.imgList = [];

    const files: File[] = event.addedFiles;
    this.selectedFiles = this.selectedFiles.concat(event.addedFiles);

    for (const file of files) {
      // console.log(file);
      this.files.push(file);
      
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const myFile: MyFile = file as MyFile;
        // myFile.url = e.target?.result;
        this.filestemp.push(myFile);
      }

    }

    console.log(files);
    console.log(this.imgList);
  }

  onRemove(event: any) {
    const index = this.files.indexOf(event);
    if (index !== -1) {
      this.files.splice(index, 1);
    }

    this.selectedFiles = this.selectedFiles.filter(
      (file: any) => file !== event
    );
  }

  removeSelectedFile(file: any) {
    this.selectedFiles = this.selectedFiles.filter(
      (selectedFile: any) => selectedFile !== file
    );
  }

  uploadFiles() {
    console.log('upload button');

    const formData = new FormData();

    for (let i = 0; i < this.files.length; i++) {
      const file = this.files[i];
      console.log('file: ' + file);

      formData.append('images', file, file.name);
      console.log('formdata: ' + formData);
    }

    this.fileService.uploadImages(formData).subscribe(
      (response) => {
        console.log('Sucessfully added in File system ' + response);

        console.log(this.user.email);
        console.log(this.files);

        this.fileService.addImages(this.user.email, this.files).subscribe(
          (response) => {
            console.log('Sucessfully added in DB' + response);
          },
          (error) => {
            console.log('Error uploading images In DB: ', error);
          }
        );
      },
      (error) => {
        console.log('Error uploading images in File system: ', error);
      }
    );
  }
}
