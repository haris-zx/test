import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../auth-service.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 loginForm!: FormGroup;

  constructor(private fb: FormBuilder,private authService: AuthServiceService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      console.log('Email:', email);
      console.log('Password:', password);
   this.authService.login(this.loginForm.value).subscribe({
        next: (response) => console.log('Signup success:', response),
        error: (err) => console.error('Signup error:', err)

      //  localStorage.setItem("token",response.token)
//       localStorage.setItem("role",response.role)
//       localStorage.setItem("refreshToken",response.refreshToken)
//      
//  if(response.role==="Employee"){
//         this.router.navigateByUrl('/addEmployee')
//       }
//else if(response.role==="manager"){
// this.router.navigateByUrl('/manager')
//       }

//       else{
//       this.router.navigateByUrl('/Admin')
      
//       }
//     });

        
      });
      

    } else {
      console.log('Form is invalid');
    }
  }
}

