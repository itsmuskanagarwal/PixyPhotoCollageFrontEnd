import { Component, ViewChild, ElementRef, Sanitizer } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { SelectImageComponent } from '../../SelectImage/select-image/select-image.component';
import { FileUploadService } from 'src/app/Services/file-upload.service';
import { FormControl } from '@angular/forms';
import { ColorPickerDirective } from 'ngx-color-picker';
import html2canvas from 'html2canvas';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResetComponent } from '../../Reset/reset/reset.component';
import { tap, catchError } from 'rxjs/operators';
import { throwError, filter, delay, take } from 'rxjs';

interface User {
  _id: string;
  name: string;
  password: string;
  email: string;
  profilePicture: string;
  verified: boolean;
  __v: number;
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent {
  user: any;
  images: any[] = [];
  recentProjects: any[] = [];
  firstThreeRecentProjects: any[] = [];
  layouts: any[] = [];
  selectedColor: string = '';
  border = 0;
  color = '#5aa8e7';
  msg = '';
  collage: boolean = false;
  cellCount = 0;
  tableSize = 400;
  rows: any[][] = [];
  showDropdown: boolean = false;

  @ViewChild('elementToConvert', { static: false })
  elementToConvert!: ElementRef;
  @ViewChild('borderSlider', { static: false }) borderSlider!: ElementRef;
  @ViewChild('colorPicker', { static: false })
  colorPicker!: ColorPickerDirective;

  constructor(
    private authService: AuthService,
    private fileService: FileUploadService,
    private dialog: MatDialog,
    private elementRef: ElementRef,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const userData = localStorage.getItem('userData');
    if (userData !== null) {
      this.user = JSON.parse(localStorage.getItem('userData') as string);
    }

    this.fileService.getProjects(this.user._id).subscribe(
      (res) => {
        if (res) {
          console.log(res);
          this.recentProjects = [];
          this.recentProjects = res;
          this.firstThreeRecentProjects=this.recentProjects.slice(0,3);
          console.log(this.recentProjects);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngAfterViewInit() {
    // Add an event listener to the slider element
    this.borderSlider.nativeElement.addEventListener(
      'input',
      this.getDataFromSlider.bind(this)
    );
  }

  toggleDropdown() {
    console.log(this.showDropdown);
    this.showDropdown = !this.showDropdown;
    console.log(this.showDropdown);
  }

  downloadImage() {
    if (this.elementToConvert) {
      console.log('In');

      html2canvas(this.elementToConvert.nativeElement, { useCORS: true }).then(
        (canvas) => {
          const imageData = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          console.log(imageData);
          link.download = 'image.png';
          link.href = imageData;
          link.click();
        }
      );
    }
  }

  saveProject() {
    console.log('save project');
    html2canvas(this.elementToConvert.nativeElement, { useCORS: true }).then(
      (canvas) =>
        canvas.toBlob((blob) => {
          if (blob) {
            const formData = new FormData();
            formData.append('images', blob, 'image.png');

            this.fileService
              .addFinalProject(this.user._id, formData)
              .pipe(
                tap((response) => console.log('Project added', response)),
                catchError((error) => {
                  console.error('Error adding project', error);
                  return throwError(error);
                })
              )
              .subscribe(() => {
                const dialogRef = this.dialog.open(ResetComponent, {
                  data: { editor: this }
                });

                dialogRef.afterClosed().subscribe( (result) => {
                  console.log("closing")
                  if (result == 'yes') {
                    this.reset();
                  }
                });
              });
          } else {
            console.error('Error converting canvas to blob');
          }
        })
    );
  }

  count(layout: number) {
    this.showDropdown = !this.showDropdown;
    this.layouts = [];
    this.cellCount = layout;

    if (layout == 2) {
      this.layouts = ['./assets/2L.png', './assets/2R.png'];
      this.fileService.count = 2;
    } else if (layout == 4) {
      this.layouts = ['./assets/4.png'];
      this.fileService.count = 4;
    } else if (layout == 9) {
      this.layouts = ['./assets/9.png'];
      this.fileService.count = 9;
    } else if (layout == 16) {
      this.layouts = ['./assets/16.png'];
      this.fileService.count = 16;
    }
  }

  getDataFromSlider() {
    if (this.borderSlider) {
      const borderValue = this.borderSlider.nativeElement.value;
      this.border = Number(borderValue);
      console.log('Border value:', borderValue);
      console.log('Border type:', typeof borderValue);
    }
  }

  onColorChange(newColor: string) {
    console.log(newColor); // prints the selected color in hex format
    this.selectedColor = newColor;
    this.color = newColor;
  }

  addImages() {
    const dialogRef = this.dialog.open(SelectImageComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.images = [];
      this.images = this.fileService.selectedImages;
      console.log('image :' + this.images);
    });
  }

  sendMail(): void {
    html2canvas(this.elementToConvert.nativeElement, { useCORS: true }).then(
      (canvas) => {
        canvas.toBlob((blob) => {
          if (blob) {
            const formData = new FormData();
            formData.append('images', blob, 'image.png');
            this.fileService.addFinalProject(this.user._id, formData).subscribe(
              (response) => {
                console.log('Project added', response);
                this.snackBar.open('Project added', 'Close', {
                  duration: 1000,
                });
              },
              (error) => {
                console.error('Error adding project', error);
              }
            );
          } else {
            console.error('Error converting canvas to blob');
          }
        });
      }
    );
  }

  createCollage() {
    console.log('color: ' + this.selectedColor);
    console.log('image: ' + this.images);
    console.log('border: ' + this.border);
    console.log('count: ' + this.cellCount);

    if(this.cellCount == this.images.length)
    {
      if (
        !this.selectedColor ||
        !this.images.length ||
        !this.border ||
        !this.cellCount
      ) {
        this.msg = 'Please check all the fields';
      } else {
        this.collage = true;
        if (this.cellCount === 2) {
          this.rows = Array(2)
            .fill(null)
            .map(() => Array(2).fill({ src: this.images[0] })); // Set the path of the first image in the array
        } else {
          const numRows = Math.sqrt(this.cellCount);
          this.rows = Array(numRows)
            .fill(null)
            .map(() => Array(numRows).fill(null));
  
          let imageIndex = 0;
          for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numRows; j++) {
              if (imageIndex < this.images.length) {
                const imagePath =
                  'http://localhost:3000/public/images/' +
                  this.images[imageIndex];
                this.rows[i][j] = { src: imagePath }; // Set the path of the next image in the array
                imageIndex++;
              }
            }
          }
        }
      }
    }

    else{

     this.msg =`Select ${this.cellCount} no. of images`
    }
    
  }

  reset() {
    this.collage = false;
    this.images = [];
    this.layouts = [];
    this.selectedColor = '';
    this.border = 0;
    this.color = '#5aa8e7';
    this.cellCount = 0;
  }
}
