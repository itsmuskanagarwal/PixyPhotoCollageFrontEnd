import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './Components/Landing/landing/landing.component';
import { HeaderComponent } from './Components/Header/header/header.component';
import { LoginComponent } from './Components/Login/login/login.component';
import { SignupComponent } from './Components/Signup/signup/signup.component';
import { ProfileComponent } from './Components/Profile/profile/profile.component';
import { EditorComponent } from './Components/Editor/editor/editor.component';
import { AboutComponent } from './Components/About/about/about.component';
import { ContactComponent } from './Components/Contact/contact/contact.component';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './Components/Projects/projects/projects.component';
import { ImageLibraryComponent } from './Components/ImageLibrary/image-library/image-library.component';
import { AvatarComponent } from './Components/Avatar/avatar/avatar.component';
import { SelectImageComponent } from './Components/SelectImage/select-image/select-image.component';
import { ResetComponent } from './Components/Reset/reset/reset.component';


import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    EditorComponent,
    AboutComponent,
    ContactComponent,
    ProjectsComponent,
    ImageLibraryComponent,
    AvatarComponent,
    SelectImageComponent,
    ResetComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatExpansionModule,
    NgxDropzoneModule,
    MatButtonModule,
    HttpClientModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatFormFieldModule,
    ColorPickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
