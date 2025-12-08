import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthServiceService } from '../../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,NgbModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder,private authService:AuthServiceService,private router:Router) {
    this.signupForm = this.fb.group({
  Email: ['', [Validators.required, Validators.email]],
  Password: ['', [Validators.required, Validators.minLength(6)]],
  OrgId: [null, Validators.required], 
  Role: [null, Validators.required]   
});
  }

  setRole(value: any) {
    this.signupForm.patchValue({ role: value });
  }

  onSubmit() {
    console.log(this.signupForm.value)
     debugger
    if (this.signupForm.valid) {
      console.log('Signup data:', this.signupForm.value);
        this.authService.signUp(this.signupForm.value).subscribe({
  next: (response: any) => {
    console.log('Signup success:', response);

    localStorage.setItem("token", response.token); 
    localStorage.setItem("role", response.role);
    localStorage.setItem("refreshToken", response.refreshToken);
    localStorage.setItem("orgId",response.orgId);
    localStorage.setItem("Id",response.id);
    debugger;
    if(response.role==0){
              this.router.navigateByUrl('/task')

    }
    else if(response.role==1){
              this.router.navigateByUrl('/managerDashboard')

    }
    else if(response.role==2){
              this.router.navigateByUrl('/adminDashboard')

    }
  },
  error: (err) => {
    console.error('Signup error:', err);
  }
})

      alert('Signup successful!');


//      
//  if(response.role==="Employee"){
//         this.router.navigateByUrl('/addEmployee')
//       }
//else if(response.role==="manager"){
// this.router.navigateByUrl('/manager')
//       }
}
//       else{
//       this.router.navigateByUrl('/Admin')
      
//       }
//     });

      
    } }
  
  
