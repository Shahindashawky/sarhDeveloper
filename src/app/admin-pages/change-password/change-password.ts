import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  standalone: false,
  templateUrl: './change-password.html',
  styleUrl: './change-password.scss'
})
export class ChangePassword {
resetpasswordForm!:FormGroup;
errorMessage: string | null = null;
  new_password = new FormControl('', 
    [Validators.required,Validators.minLength(6)]
  );
  new_password_confirmation = new FormControl('', 
    Validators.required
  );


    constructor( private api:ApiService,
    private fb: FormBuilder,private router:Router
    
  ) {}

  ngOnInit(): void {
  this.resetpasswordForm = this.fb.group({
    new_password: this.new_password,
    new_password_confirmation: this.new_password_confirmation,

  });
  }



 
 onSubmit() {
  this.api.resetPassword(this.resetpasswordForm.value).subscribe({
    next: (res: any) => {
      this.router.navigateByUrl('admin-login').then(() => {
        // window.location.reload();
      });
    },
    error: (err: HttpErrorResponse) => {
      this.errorMessage = err.error.message || 'Something went wrong';
        if (err.error.message) {
    this.resetpasswordForm.get('new_password')?.setErrors({ backend: err.error.message });
  }  if (err.error.message) {
    this.resetpasswordForm.get('new_password_confirmation')?.setErrors({ backend: err.error.message });
  }
      console.log(err.error.message);
    }
  });
}

  }

