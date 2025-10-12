import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/languageservice';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {
 goals:any;
 visions:any;
 currentLang: 'ar' | 'en' = 'ar';

  constructor(private translate: TranslateService, private langService: LanguageService) { }

  ngOnInit(): void {
        this.langService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });
    this.showgoalsandvision();
      this.translate.onLangChange.subscribe(() => {
      this.showgoalsandvision();
    });
  }
   showgoalsandvision(){
       this.goals = [
    { icon: 'pi pi-check-circle', title: this.translate.instant('commitment'), text: this.translate.instant('commitment-text') },
    { icon: 'pi pi-users', title: this.translate.instant('clients'), text: this.translate.instant('clients-text') },
    { icon: 'pi pi-building', title: this.translate.instant('projects'), text: this.translate.instant('projects-text') },
    { icon: 'pi pi-chart-line', title: this.translate.instant('growth'), text: this.translate.instant('growth-text') }
  ];

  this.visions = [
    { icon: 'pi pi-flag', title: this.translate.instant('excellence'), text: this.translate.instant('excellence-text') },
    { icon: 'pi pi-briefcase', title: this.translate.instant('identity'), text: this.translate.instant('identity-text') },
    { icon: 'pi pi-heart', title: this.translate.instant('trust'), text: this.translate.instant('trust-text') },
    { icon: 'pi pi-globe', title: this.translate.instant('contribution'), text: this.translate.instant('contribution-text') }
  ];
    }
}
