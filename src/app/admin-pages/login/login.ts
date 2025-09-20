import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
// import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  loginForm!: FormGroup;
  email = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}'),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder,
    private router: Router,
    // private messageService: MessageService
  ) {}

  users: any[] = [];


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // this.AutoLogin();
  }
// Message(message:any){
//   this.messageService.add({ severity: 'error', summary: 'Error', detail: message });

// }

  onSubmit() {
  //   let email = this.loginForm.controls.email.value;
  //   let password = this.loginForm.controls.password.value;
  //   this.api.login(email, password).then((userCredential) => {
  //   const user = this.users.find((user: any) => user.email === userCredential.user?.email );

  //  if(user){
     
  //    this.api.setAuth(true);
  //    userCredential.user?.getIdToken().then(t=>
  //    localStorage.setItem('token', t))
  //         localStorage.setItem('email',user.email)
  //        if(this.rememberMe) {
  //         localStorage.setItem('rememberMe', 'yes')
  //       }
  //       if(user?.role == 'Administration'){
  //         this.router.navigateByUrl('viewPermissionmanagment');
      
  //       }
  //       else{
  //         this.router.navigateByUrl('user-home');
         
  //       }
  //  }
  //  else {
  //   this.Message('Login failed: invalid credentials')
  // }
 

  //   }).catch(err=> this.Message('Login failed: invalid credentials'))

}
AutoLogin(){
//   if (isPlatformBrowser(this.platformId)) {
//   const accessTokenObj = localStorage.getItem("token");
//   const rememberMe = localStorage.getItem('rememberMe');
//   if (accessTokenObj && rememberMe == 'yes') {
//     this.router.navigateByUrl('user-home');
//   } 
//  }
}
}
