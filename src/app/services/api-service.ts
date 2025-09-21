import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse,} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  
    private apiUrl = environment.apiUrl;
    httpOption: any;
    httpFileOption: any;
    token: any;
    auth = false;


 constructor(private http: HttpClient,@Inject(PLATFORM_ID) private platformId: Object) {
      if (isPlatformBrowser(this.platformId)) {
  this.token = localStorage.getItem('token');
      }
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`|| '',
      }),
    };
    this.httpFileOption = {
      headers: new HttpHeaders({
        Authorization: this.token || '',
      }),
    };
  }

 

  login(data: any) {
    return this.http.post(`${this.apiUrl}/auth/login`, data, {
      headers: this.httpOption.headers,
    });
  }
   resetPassword(rdata: any) {
    return this.http.post(`${this.apiUrl}/auth/change-password?locale=ar`, rdata, {
      headers: this.httpOption.headers,
    });
  }
}
