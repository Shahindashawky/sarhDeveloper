import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/languageservice';
import { ApiService } from './../../services/api-service';
import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { forkJoin, debounceTime, switchMap } from 'rxjs';
import { ParentRegion } from '../../../model/ParentRegion';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  currentLang: 'ar' | 'en' = 'ar';
  visible: boolean = false;
  prev: any;
  project: any;
  lastunit: any;
  projectimage = '';
  regionimage = '';
  unitimage = '';
  propertyTypes: any;
  projectType:any;
  prices:any;
  isActive=false;
  selectprojecttype:any;


  locations: any;

  selectedProperty: any;
  selectedPrice: any;
  selectedLocation: any;

  projectsReversed: any;


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
  constructor(private loadingService: LoadingService, private translate: TranslateService, private ApiService: ApiService, private langService: LanguageService) {
    this.loadingService.show();
    this.projectimage = this.ApiService.projectImage,
      this.regionimage = this.ApiService.regionImage,
      this.unitimage = this.ApiService.unitImage
  this.prices = [
    { id: 1,min_price: '',max_price: '1,000,000', label1:"",label2:"اقل من",price:this.translate.instant('price') },
    { id: 2,min_price: '1,000,000',max_price: '5,000,000', label1:"أكثر من",label2:"اقل من" ,price:this.translate.instant('price')},
    { id: 3,min_price: '5,000,000',max_price: '10,000,000', label1:"أكثر من",label2:"اقل من" ,price:this.translate.instant('price')},
    { id: 4,min_price: '10,000,000',max_price: '', label1:"أكثر من",label2:"",price:this.translate.instant('price') },


  ];
  }

  ngOnInit() {
    this.loadingService.show();
    this.langService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });
    this.getdata();
    this.getsearchdata();
    this.translate.onLangChange.pipe(
      debounceTime(300),
      switchMap((event) => {
        this.currentLang = event.lang as 'ar' | 'en';
        this.loadingService.show();
        return forkJoin({
          prev: this.ApiService.getpreviouslist(this.currentLang),
          project: this.ApiService.getProjectList(this.currentLang),
          lastunit: this.ApiService.getlastUnit(this.currentLang)
        })
      })
    )
      .subscribe({
        next: (res) => {
          this.prev = res.prev.data;
          this.project = res.project;
          this.projectsReversed = [...this.project].reverse();
          this.lastunit = res.lastunit;
          this.loadingService.hide();
        }
      });


  }
  getsearchdata() {

    this.ApiService.getRegionswithlang(this.currentLang).subscribe(r => {
      this.locations = r;

    })

    this.ApiService.getUnitsTypewithlang(this.currentLang).subscribe(u => {
      this.propertyTypes = u
    })
     
    this.ApiService.getProjectTypewithlang(this.currentLang).subscribe(t => {
      this.projectType = t
    })
  }
  active(id:any){
  this.isActive=true;
  this.selectprojecttype=id;
  }
  search(){
    
  }
  getdata() {
    this.loadingService.show();
    forkJoin({
      prev: this.ApiService.getpreviouslist(this.currentLang),
      project: this.ApiService.getProjectList(this.currentLang),
      lastunit: this.ApiService.getlastUnit(this.currentLang)
    }).subscribe({
      next: (res) => {
        this.prev = res.prev.data;
        this.project = res.project;
        this.projectsReversed = [...this.project].reverse();
        this.lastunit = res.lastunit;
        this.loadingService.hide();
      }
    });

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
