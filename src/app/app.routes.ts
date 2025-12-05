import { Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {
    path: "", redirectTo: "home", pathMatch: "full"  
  },
  {
     path: "home", component: LoginComponent
   },
  {
    path: "signup", component: SignupComponent
  },
]