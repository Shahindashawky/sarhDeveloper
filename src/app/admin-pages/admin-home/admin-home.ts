import { Component, DOCUMENT, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-home',
  standalone: false,
  templateUrl: './admin-home.html',
  styleUrl: './admin-home.scss'
})
export class AdminHome {
  constructor(
    private translate: TranslateService,
    @Inject(DOCUMENT) private document: Document
  ) {
        this.translate.use('en');
    this.document.documentElement.dir =  'ltr';

  }
}
