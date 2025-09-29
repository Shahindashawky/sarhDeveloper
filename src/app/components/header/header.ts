import { Component, Inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { LanguageService } from '../../services/languageservice';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  items: MenuItem[] = [];
  sidebarVisible: boolean = false;
  currentLang = 'ar';

  constructor(private translate: TranslateService,private langService: LanguageService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.translate.setDefaultLang('ar');
    this.translate.use('ar');
    this.setDirection('ar');
    this.langService.setLang('ar');

  }
  setDirection(lang: string) {
    this.document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
  ngOnInit() {
     this.buildMenu();
    this.translate.onLangChange.subscribe(() => {
      this.buildMenu();
    });
  }
  buildMenu() {
    this.items = [
      { label: this.translate.instant('home'), routerLink: '/', routerLinkActiveOptions: { exact: true } },
      { label: this.translate.instant('about'), routerLink: '/about' },
      { label: this.translate.instant('projects'), routerLink: '/projects' },
      { label: this.translate.instant('business'), routerLink: '/business' },
      { label: this.translate.instant('followup'), routerLink: '/followup' },
      { label: this.translate.instant('delivery'), routerLink: '/delivery' }
    ];
  }

  switchLang() {
    this.currentLang = this.currentLang === 'ar' ? 'en' : 'ar';
    this.translate.use(this.currentLang);
    this.setDirection(this.currentLang);
    this.langService.setLang(this.currentLang);

  }
}
