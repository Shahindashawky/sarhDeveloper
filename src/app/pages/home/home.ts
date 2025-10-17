import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/languageservice';
import { ApiService } from './../../services/api-service';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  currentLang: 'ar' | 'en' = 'ar';
  visible: boolean = false;
  prev:any;
  project:any;
  lastunit:any;
  projectimage='';
  regionimage='';
   unitimage='';
  propertyTypes = [
    { label: 'شقة', value: 'flat' },
    { label: 'فيلا', value: 'villa' }
  ];

  prices = [
    { label: 'أقل من 1,000,000', value: '1m' },
    { label: 'أكثر من 1,000,000', value: 'more' }
  ];

  locations = [
    { label: 'القاهرة', value: 'cairo' },
    { label: 'الجيزة', value: 'giza' }
  ];

  selectedProperty: any;
  selectedPrice: any;
  selectedLocation: any;

  projectsReversed : any;


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
  constructor(private translate: TranslateService,private ApiService: ApiService, private langService: LanguageService) {
    this.projectimage=this.ApiService.projectImage,
        this.regionimage=this.ApiService.regionImage,
        this.unitimage=this.ApiService.unitImage

   }

  ngOnInit() {
    this.langService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });
    this.getdata();
    this.translate.onLangChange.subscribe(() => {
      this.getdata();
    });

  }
  getdata(){
    this.ApiService.getpreviouslist(this.currentLang).subscribe(p=>{
      this.prev=p.data
    })
    this.ApiService.getProjectList(this.currentLang).subscribe(p=>{
      this.project=p;
      this.projectsReversed = [...this.project].reverse();

    })
    this.ApiService.getlastUnit(this.currentLang).subscribe(u=>{
      this.lastunit=u
    })
  }
    onImageError(event: any) {
    event.target.src = this.projectimage;
  }
      onImageError2(event: any) {
    event.target.src = this.regionimage;
  }
        onImageError3(event: any) {
    event.target.src = this.unitimage;
  }
scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

    showDialog() {
        this.visible = true;
    }

}
