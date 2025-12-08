import { Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { TodoComponent } from './todo/todo.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';

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
  {
    path: "task", component: TodoComponent
  },

  {
    path: "adminDashboard", component: AdminDashboardComponent
  },
   {
    path: "managerDashboard", component: ManagerDashboardComponent
  },

]