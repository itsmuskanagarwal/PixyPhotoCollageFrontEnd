import { Component } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { FileUploadService } from 'src/app/Services/file-upload.service';

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
  uploadedImages : any[] =[];

  constructor(private fileService: FileUploadService) {}

  ngOnInit() {
    const userData = localStorage.getItem('userData');
    if (userData !== null) {
      this.user = JSON.parse(localStorage.getItem('userData') as string);
      // this.currentUser = this.user;
    }

    console.log(this.user);

    this.fileService.getUploadedImages(this.user._id).subscribe((res)=>{
      if(res){
        console.log(typeof res)
        this.uploadedImages =[]
        this.uploadedImages = res
         console.log(this.uploadedImages)
      }
    },
    (error)=>{
      console.log(error)
    })
  }

  onSelect(event: any) {
    this.files = [];

    const files: File[] = event.addedFiles;
    this.selectedFiles = this.selectedFiles.concat(event.addedFiles);

    for (const file of files) {
      // console.log(file);
      this.files.push(file);
      
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const myFile: MyFile = file as MyFile;
        myFile.url = e.target?.result ?? null;
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

  deleteUploadedImage(filename:string){
    console.log(filename)

    this.fileService.deleteUploadedImages(filename).subscribe((res)=>
    {
      console.log("deleted sucessfully")

      this.fileService.getUploadedImages(this.user._id).subscribe((res)=>{
        if(res){
          console.log(res)
          this.uploadedImages =[]
          this.uploadedImages = res
           console.log(this.uploadedImages)
        }
      },
      (error)=>{
        console.log(error)
      })

    },(error)=>{
      console.log(error)
    })
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

    console.log(formData)
    
    console.log(this.user.name);
    console.log(this.user._id);
    console.log(this.files);

    this.fileService.uploadImages(this.user._id,formData).subscribe(
      (response) => {
        console.log('Sucessfully added in File system ' + response);
        this.selectedFiles = []

        this.fileService.getUploadedImages(this.user._id).subscribe((res)=>{
          if(res){
            console.log(res)
            this.uploadedImages =[]
            this.uploadedImages = res
             console.log(this.uploadedImages)
             this.files = [];
          }
        },
        (error)=>{
          console.log(error)
        })

      },
      (error) => {
        console.log('Error uploading images in File system: ', error);
      }
    );
  }
}
