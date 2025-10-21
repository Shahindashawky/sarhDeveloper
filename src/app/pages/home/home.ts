import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/languageservice';
import { ApiService } from './../../services/api-service';
import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { forkJoin, debounceTime, switchMap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  searchForm!: FormGroup;
  currentLang: 'ar' | 'en' = 'ar';
  visible: boolean = false;
  prev: any;
  project: any;
  lastunit: any;
  projectimage = '';
  regionimage = '';
  unitimage = '';
  propertyTypes: any;
  projectType: any;
  minprices: any;
  maxprices: any;
  activeIndex: any;
  selectprojecttype: any;
  locations: any;
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
  constructor(private loadingService: LoadingService, private router:Router,
    private fb: FormBuilder, private translate: TranslateService, private ApiService: ApiService, private langService: LanguageService) {
    this.loadingService.show();
    this.projectimage = this.ApiService.projectImage,
      this.regionimage = this.ApiService.regionImage,
      this.unitimage = this.ApiService.unitImage
    this.minprices = [
      { id: 1, min_price: '5,00,000', label: "أكثر من" },
      { id: 2, min_price: '1,000,000', label: "أكثر من" },
      { id: 3, min_price: '5,000,000', label: "أكثر من" },
      { id: 4, min_price: '10,000,000', label: "أكثر من" },


    ];
    this.maxprices = [
      { id: 1, max_price: '1,000,000', label: "اقل من" },
      { id: 2, max_price: '5,000,000', label: "اقل من" },
      { id: 3, max_price: '10,000,000', label: "اقل من" },
      { id: 4, max_price: '15,000,000', label: "اقل من" },


    ];
  }

  ngOnInit() {
    this.loadingService.show();
    this.langService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });
    this.getdata();
    this.getsearchdata();
    this.initializeForm();
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
  initializeForm(): void {
    this.searchForm = this.fb.group({
      unit_type_id: [null],
      min_price: [null],
      max_price: [null],
      region_id: [null],


    });
  }
  onSubmit(): void {
    if (this.searchForm.valid) {
      let search: any = {
        unit_type_id: this.searchForm.value.unit_type_id,
        min_price: this.searchForm.value.min_price,
        max_price: this.searchForm.value.max_price,
        region_id: this.searchForm.value.region_id,
        project_type_id: this.selectprojecttype|| '',

      };

      // let formData: any = new FormData();
      // for (const key in search) {
      //   if (search.hasOwnProperty(key)) {
      //     const value = search[key];
      //     formData.append(key, value);
      //   }
      // }
          console.log(search);
          this.router.navigate(['/units'], { queryParams: search });
          this.visible = false;

    }
    
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
  active(id: any) {
    this.activeIndex = id
    this.selectprojecttype = id;
  }
  search() {

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
