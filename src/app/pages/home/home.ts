import { LanguageService } from '../../services/languageservice';
import { ApiService } from './../../services/api-service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  currentLang: 'ar' | 'en' = 'ar';

  projects = [
    {
      title: 'النرجس الجديدة',
      img: '/images/build2.png',
    },
    {
      title: 'نورت هاوس',
      img: '/images/building.png',
    },
    {
      title: 'بيت الوطن',
      img: '/images/build3.png',
    },
    { title: 'المعادى', img: 'images/build4.png' },
    { title: 'أكتوبر', img: 'images/build5.png' },
    { title: 'القاهرة الجديدة', img: 'images/build6.png' },
  ];
  projectsReversed = [...this.projects].reverse();
  featuredProject = {
    title: 'بيت الوطن',
    image: '/images/build3.png',
    location: 'المعادى - القاهرة',
    type: 'سكنى',
    area: 120,
    rooms: 3,
    baths: 2
  };

  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '1199px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
  constructor(private ApiService: ApiService, private langService: LanguageService) { }

  ngOnInit() {
    this.langService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });


  }


}
