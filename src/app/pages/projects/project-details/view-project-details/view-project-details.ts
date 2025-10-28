import { Component, model, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../../services/languageservice';
import { ApiService } from '../../../../services/api-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoadingService } from '../../../../services/loading.service';

@Component({
  selector: 'app-view-project-details',
  standalone: false,
  templateUrl: './view-project-details.html',
  styleUrl: './view-project-details.scss'
})
export class ViewProjectDetails {
  projectImage = '';
  unitImage = '';
  currentLang: 'ar' | 'en' = 'ar';
  projectId: any;
  project: any;
  images = model<string[]>([]);
  units: any;
selectedUnitId: number | null = null;
ficon:any;
  private observer?: MutationObserver;

  constructor(private loadingService: LoadingService,
    private translate: TranslateService,
    private langService: LanguageService,
    private api: ApiService,
    private route: ActivatedRoute, private location: Location, private router: Router

  ) {
    this.projectImage = this.api.projectImage;
    this.unitImage = this.api.unitImage;
        this.ficon=this.api.facilityIcon;

    this.route.params.subscribe((params) => {
      this.projectId = params['id'];
    });
  }
  ngAfterViewInit() {
    // إعادة تهيئة الواجهة بعد التحميل الأول
    setTimeout(() => window.dispatchEvent(new Event('resize')), 500);
  }

  ngOnDestroy() {
    // تنظيف الـ observer عند تدمير الكمبوننت
    if (this.observer) this.observer.disconnect();
  }
  ngOnInit(): void {
    this.loadingService.show();
    this.langService.currentLang$.subscribe((lang) => {
      this.currentLang = lang as 'ar' | 'en';
    });

    this.getProject();
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang as 'ar' | 'en';
      this.getProject();
    });


  }

  getProject(): void {
    this.loadingService.show();
    this.api.getProjectDetails(this.projectId, this.currentLang).subscribe({
      next: (p) => {
        this.project = p;
        const gallery = Array.isArray(p.gallery_images) ? p.gallery_images : [];
        if (p.main_image) {
          this.images.set([p.main_image, ...gallery]);
        } else {
          this.images.set(gallery);
        }
        
        this.getUnits('');
        this.loadingService.hide();
      }
    });
  }
  getUnits(unittypeid: any) {
     this.selectedUnitId = unittypeid;

    if (unittypeid == null) {
      unittypeid = ''
    }
    this.api.getProjectUnits(this.projectId, this.currentLang, unittypeid).subscribe((unit) => {
      this.units = unit;

    })
  }
  downloadPdf(): void {
    if (this.project?.pdf) {
      window.open(this.project.pdf, '_blank');
    } else {
      console.warn('No PDF available for this project');
    }
  }
  onImageError(event: any) {
    event.target.src = this.projectImage;
  }
    onImageError2(event: any) {
    event.target.src = this.ficon;
  }
  goBack() {
    this.location.back();
  }
  goToUnit(id: any) {
    this.router.navigate(['/view-unit-details', id]);
  }
  responsiveOptions = [
  {
    breakpoint: '1024px',
    numVisible: 5
  },
  {
    breakpoint: '768px',
    numVisible: 3
  },
  {
    breakpoint: '560px',
    numVisible: 2
  }
];

}
