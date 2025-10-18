import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../../services/api-service';
import { LanguageService } from '../../../services/languageservice';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoadingService } from '../../../services/loading.service';

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
    this.api.getProjectList(this.currentLang).subscribe(p => {
      p.filter((f: any) => f.id == this.regionId).map((a: any) => { this.regionTitle = a.name })
this.loadingService.hide();
    })
    this.getProject();
    this.translate.onLangChange.subscribe(() => {
      this.getProject();
    });
  }

  getProject() {
    this.loadingService.show();
    this.api.getRegionDetails(this.regionId, this.currentLang).subscribe(p => {
      this.regionList = p;
      this.loadingService.hide();
    })
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
