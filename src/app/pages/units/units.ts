import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/languageservice';
import { ApiService } from '../../services/api-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoadingService } from '../../services/loading.service';
@Component({
  selector: 'app-units',
  standalone: false,
  templateUrl: './units.html',
  styleUrl: './units.scss'
})
export class Units {
  UnitList: any[] = [];
  currentLang: 'ar' | 'en' = 'ar';
  unitImage = '';

  constructor(
    private loadingService: LoadingService,
    private translate: TranslateService,
    private langService: LanguageService,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.unitImage = this.api.unitImage;
  }

  ngOnInit(): void {
    this.loadingService.show();

    this.langService.currentLang$.subscribe((lang) => {
      this.currentLang = lang as 'ar' | 'en';
    });

    this.route.queryParams.subscribe((params) => {
      this.search(params);
    });

    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang as 'ar' | 'en';
      const params = this.route.snapshot.queryParams;
      this.search(params);
    });
  }

  search(data: any) {
    this.loadingService.show();
    this.api.search(this.currentLang,data).subscribe({
      next: (res: any) => {
        this.UnitList = res;
        this.loadingService.hide();
      },
      error: (err) => {
        console.error(err);
        this.loadingService.hide();
      },
    });
  }
  onImageError(event: any) {
    event.target.src = this.unitImage;
  }
  goToUnit(id: any) {
    this.router.navigate(['/view-unit-details', id]);
  }
  goBack() {
    this.location.back();
  }
}
