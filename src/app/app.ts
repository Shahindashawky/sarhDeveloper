import { Component, signal , Inject, PLATFORM_ID, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Event, NavigationEnd } from '@angular/router';
import { LoadingService } from './services/loading.service';
import { ApiService } from './services/api-service';
import { ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  hideLayout = false;
  private lastUrl = '';
  loading: any;
  protected readonly title = signal('sarh-real-estate');

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private cdr: ChangeDetectorRef, private api: ApiService, private router: Router, private loadingService: LoadingService) {
    this.loading = this.loadingService.loading$;
    // this.loadingService.show();


    this.router.events.subscribe(() => {
      const currentUrl = this.router.url;
      setTimeout(() => {
        this.hideLayout = currentUrl.includes('admin');
      });
      this.cdr.detectChanges();
    });


    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (this.lastUrl !== event.urlAfterRedirects) {
          if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }
        this.lastUrl = event.urlAfterRedirects;
      }
    });
  }
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const loader = document.getElementById('global-loader');
      if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
      }
    }
  }
}
