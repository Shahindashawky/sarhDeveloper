import { Component } from '@angular/core';
import { LanguageService } from '../../services/languageservice';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  currentLang = 'ar';

    constructor( private langService: LanguageService) { }
  
  ngOnInit() {
    this.langService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });
}

  gotoTop(){
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }
}
