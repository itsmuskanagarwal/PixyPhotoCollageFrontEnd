import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './Components/Landing/landing/landing.component';
import { HeaderComponent } from './Components/Header/header/header.component';
import { LoginComponent } from './Components/Login/login/login.component';
import { SignupComponent } from './Components/Signup/signup/signup.component';
import { ProfileComponent } from './Components/Profile/profile/profile.component';
import { EditorComponent } from './Components/Editor/editor/editor.component';
import { AboutComponent } from './Components/About/about/about.component';
import { ContactComponent } from './Components/Contact/contact/contact.component';
import { ProjectsComponent } from './Components/Projects/projects/projects.component';
import { ImageLibraryComponent } from './Components/ImageLibrary/image-library/image-library.component';
import { AuthdeactivateGuard } from './Auth/authdeactivate.guard';
import { AuthactivateGuard } from './Auth/authactivate.guard';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'landing' },
  { path: 'login', component:LoginComponent, canActivate : [AuthdeactivateGuard] },
  { path: 'signup', component: SignupComponent, canActivate : [AuthdeactivateGuard]},
  { path: 'landing', component: LandingComponent,canActivate : [AuthdeactivateGuard]},
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'profile', component: ProfileComponent, canActivate : [AuthactivateGuard] },
  { path: 'editor', component: EditorComponent,  canActivate : [AuthactivateGuard]},
  { path: 'projects', component: ProjectsComponent,  canActivate : [AuthactivateGuard] },
  { path: 'imglibrary', component: ImageLibraryComponent,  canActivate : [AuthactivateGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
