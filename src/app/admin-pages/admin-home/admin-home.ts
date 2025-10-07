import { Component, DOCUMENT, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-admin-home',
  standalone: false,
  templateUrl: './admin-home.html',
  styleUrl: './admin-home.scss'
})
export class AdminHome {
  constructor(
    private translate: TranslateService,private api:ApiService,
    @Inject(DOCUMENT) private document: Document, private router:Router
  ) {
        this.translate.use('en');
    this.document.documentElement.dir =  'ltr';

  }
  logout(){
    localStorage.removeItem('token');
    this.api.auth = false;
        localStorage.removeItem('auth');
    this.router.navigateByUrl('/admin-login');
  }
}
