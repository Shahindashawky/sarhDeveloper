import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../../services/api-service';
import { LanguageService } from '../../../services/languageservice';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoadingService } from '../../../services/loading.service';
import { forkJoin ,debounceTime, switchMap } from 'rxjs';

@Component({
  selector: 'app-region-details',
  standalone: false,
  templateUrl: './region-details.html',
  styleUrl: './region-details.scss'
})
export class RegionDetails {
  regionImage = '';
  currentLang: 'ar' | 'en' = 'ar';
  regionList: any;
  regionId: any;
  regionTitle: any;

  constructor(private loadingService:LoadingService,private translate: TranslateService, private langService: LanguageService, private api: ApiService, private route: ActivatedRoute, private router: Router, private location: Location) {
    this.regionImage = this.api.regionImage;
    this.route.params.subscribe((params) => {
      this.regionId = params['id'];
    });

  }

  ngOnInit(): void {
    this.loadingService.show();

    this.langService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });

    this.loadAllData();

    this.translate.onLangChange
      .pipe(
        debounceTime(300),
        switchMap((event) => {
     this.currentLang = event.lang as 'ar' | 'en';
          this.loadingService.show();
          return forkJoin({
            regionList: this.api.getRegionDetails(this.regionId, this.currentLang),
            projectList: this.api.getProjectList(this.currentLang)
          });
        })
      )
      .subscribe({
        next: (res) => {
          this.regionList = res.regionList;
          const region = res.projectList.find((f: any) => f.id == this.regionId);
          this.regionTitle = region?.name || '';
          this.loadingService.hide();
        },
        error: (err) => {
          console.error('Error reloading data after lang change:', err);
          this.loadingService.hide();
        }
      });
  }

  loadAllData() {
    this.loadingService.show();

    forkJoin({
      regionList: this.api.getRegionDetails(this.regionId, this.currentLang),
      projectList: this.api.getProjectList(this.currentLang)
    }).subscribe({
      next: (res) => {
        this.regionList = res.regionList;
        const region = res.projectList.find((f: any) => f.id == this.regionId);
        this.regionTitle = region?.name || '';
        this.loadingService.hide();
      }
    });
  }
  onImageError(event: any) {
    event.target.src = this.regionImage;
  }
  goToProject(id: any) {
    this.router.navigate(['/project-details', id]);
  }
      goBack() {
  this.location.back();
}
}
