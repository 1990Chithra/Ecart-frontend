import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private fb:FormBuilder,private api:ApiService,private route:Router){}

  registerForm=this.fb.group({//group
     username:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]], //array
     email:['',[Validators.required,Validators.pattern('[a-zA-Z0-9@.]*')]],
     password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })
  //control passes through html
 register(){
  if(this.registerForm.valid){

    const username=this.registerForm.value.username
    const email=this.registerForm.value.email
    const password=this.registerForm.value.password
    console.log(username,email,password);

    const user ={username,email,password}
    this.api.register(user).subscribe({
        next:(res:any)=>{
          Swal.fire({
            title: 'success!',
            text: 'User Registration Successfull',
            icon: 'success',
            confirmButtonText: 'back'
          })
          this.route.navigateByUrl('/user/login')
        },
        error:(err)=>{          
          if(err.status===404){
            Swal.fire({
              title: 'error!',
              text: 'User already registered',
              icon: 'error',
              confirmButtonText: 'back'
            })
          }
          else{
            Swal.fire({
              title: 'error!',
              text: 'Registration Failed',
              icon: 'error',
              confirmButtonText: 'back'
            })
          }
        }
    })
   
  }
  else{
    alert("Invalid Registration Form")
  }
 }
}
