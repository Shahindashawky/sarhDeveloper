import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  items: MenuItem[] = [];
  sidebarVisible: boolean = false;

  ngOnInit() {
    this.items = [
      { label: 'الرئيسية', routerLink: '/',routerLinkActiveOptions: { exact: true } },
      { label: 'من نحن', routerLink: '/about' },
      { label: 'المشروعات', routerLink: '/projects' },
      { label: 'سابقة الأعمال', routerLink: '/business' },
      { label: 'متابعة الإنشاءات', routerLink: '/followup' },
      { label: 'مواصفات التسليم', routerLink: '/delivery' }
    ];
  }
}
