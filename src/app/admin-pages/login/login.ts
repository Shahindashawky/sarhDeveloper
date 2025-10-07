import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { ApiService } from '../../services/api-service';
// import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

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
    private api: ApiService
  ) {}



  ngOnInit(): void {
    this.loginForm = this.fb.group({
    email: this.email,
    password: this.password
      });

  }
// Message(message:any){
//   this.messageService.add({ severity: 'error', summary: 'Error', detail: message });

// }

onSubmit() {
  this.api.login(this.loginForm.value).subscribe({
    next: (i: any) => {
      localStorage.setItem('token', i.token);
      this.api.token = i.token;
      this.api.httpOption.Authorization = i.token;
      
      if (i.token) {
        this.api.setAuth(true);
        this.api.auth = true;
        this.router.navigateByUrl('admin-home');
      }
    },
    error: (err: HttpErrorResponse) => {
      console.log(err.error.message);
    }
  });
}



}
