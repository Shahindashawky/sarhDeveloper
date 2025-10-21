import { LanguageService } from './../../../../services/languageservice';
import { Component, model, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from '../../../../services/api-service';
import { LoadingService } from '../../../../services/loading.service';
@Component({
  selector: 'app-view-unit-details',
  standalone: false,
  templateUrl: './view-unit-details.html',
  styleUrl: './view-unit-details.scss'
})
export class ViewUnitDetails {
  unitImage = '';
  currentLang: 'ar' | 'en' = 'ar';
  unitId: any;
  unit: any;
  images = model<string[]>([]);
  ficon: any;
  projectunits:any;
  selectedUnitId: number | null = null;

  constructor(private loadingService: LoadingService,
    private translate: TranslateService,
    private langService: LanguageService,
    private api: ApiService,
    private route: ActivatedRoute, private location: Location, private router: Router

  ) {
    this.unitImage = this.api.unitImage;
    this.ficon = this.api.facilityIcon;
    this.route.params.subscribe((params) => {
      this.unitId = params['id'];
    });
  }

  ngOnInit(): void {
    this.loadingService.show();
    this.langService.currentLang$.subscribe((lang) => {
      this.currentLang = lang;
    });

    this.getunit();
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang as 'ar' | 'en';
      this.getunit();
    });


  }

  getunit(): void {
    this.loadingService.show();
    this.api.getProjectUnitById(this.unitId, this.currentLang).subscribe({
      next: (u) => {
        this.unit = u;
        const gallery = Array.isArray(u.gallery_images) ? u.gallery_images : [];
        if (u.main_image) {
          this.images.set([u.main_image, ...gallery]);
        } else {
          this.images.set(gallery);
        }
        this.getprojectunit(this.unit.project_id,'')        
        this.loadingService.hide();
      }
    });
  }
getprojectunit(projectid:any,unittypeid:any){
    this.selectedUnitId = unittypeid;

    if (unittypeid == null) {
      unittypeid = ''
    }
   this.api.getProjectUnits(projectid, this.currentLang, unittypeid).subscribe((unit) => {
      this.projectunits = unit;

    })
}
  goToUnit(id: any) {
    this.router.navigate(['/view-unit-details', id]);
  }
  onImageError(event: any) {
    event.target.src = this.unitImage;
  }
  onImageError2(event: any) {
    event.target.src = this.ficon;
  }
  goBack() {
    this.location.back();
  }


}
