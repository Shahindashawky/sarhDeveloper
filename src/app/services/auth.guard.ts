import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api-service';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private router: Router,
    private api: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
        if (typeof window === 'undefined') return false;

      const isLoggedIn = localStorage.getItem('auth') === 'true';

      if (isLoggedIn && this.api.getAuth()) {
        return true;
      } else {
        this.router.navigate(['/admin-login']);
        return false;
      }
    }

    return false;
  }
  
}
