import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient,) { }


  signUp(data:any){

    debugger
    const signUpUrl='https://localhost:7063/api/User'
    return this.http.post(signUpUrl,data,{ withCredentials: true} );


  }

   login(data:any){

    const loginUrl='https://localhost:7063/api/User/login'
     return this.http.post(loginUrl,data,{ withCredentials: true} );

   }
}
