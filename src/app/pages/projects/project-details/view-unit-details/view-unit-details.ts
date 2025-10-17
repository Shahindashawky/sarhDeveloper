import { LanguageService } from './../../../../services/languageservice';
import { Component, model, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from '../../../../services/api-service';
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

  constructor(
    private translate: TranslateService,
    private langService: LanguageService,
    private api: ApiService,
    private route: ActivatedRoute, private location: Location, private router: Router

  ) {
    this.unitImage = this.api.unitImage;
    this.route.params.subscribe((params) => {
      this.unitId = params['id'];
    });
  }

  ngOnInit(): void {
    this.langService.currentLang$.subscribe((lang) => {
      this.currentLang = lang as 'ar' | 'en';
    });

    this.getunit();
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang as 'ar' | 'en';
      this.getunit();
    });


  }

  getunit(): void {
    this.api.getProjectUnitById(this.unitId, this.currentLang).subscribe({
      next: (u) => {
        this.unit = u;
                const gallery = Array.isArray(u.gallery_images) ? u.gallery_images : [];
    if (u.main_image) {
      this.images.set([u.main_image, ...gallery]);
    } else {
      this.images.set(gallery);
    }
      },
      error: (err) => {
        console.error('Error loading unit details:', err);
      },
    });
  }


  onImageError(event: any) {
    event.target.src = this.unitImage;
  }
  goBack() {
    this.location.back();
  }


}
