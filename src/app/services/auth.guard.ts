import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private router: Router,
    private api: ApiService) {}

  canActivate(): boolean {
        console.log('CanActivate called');
      if (!this.api.getAuth()){
        this.router.navigateByUrl('admin-login')
        return false
      } 
      return true;

  }
  
}
