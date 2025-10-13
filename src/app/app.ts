import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import {  Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
    hideLayout = false;
  private lastUrl = '';

  protected readonly title = signal('sarh-real-estate');
  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      const currentUrl = this.router.url;
      this.hideLayout = currentUrl.includes('admin');
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
}
