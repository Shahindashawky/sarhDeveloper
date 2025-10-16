import { Component, model, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { LanguageService } from '../../../services/languageservice';
import { ApiService } from '../../../services/api-service';

@Component({
  selector: 'app-construction-details',
  standalone: false,
  templateUrl: './construction-details.html',
  styleUrl: './construction-details.scss'
})
export class ConstructionDetails {
  projectImage = '';
  currentLang: 'ar' | 'en' = 'ar';
  constructionId: any;
  project: any;
  units: any;
  dates: any;
  selecteddate: any = null;
  filteredProjects:any;

  constructor(
    private translate: TranslateService,
    private langService: LanguageService,
    private api: ApiService,
    private route: ActivatedRoute, private location: Location, private router: Router

  ) {
    this.projectImage = this.api.projectImage;
    this.route.params.subscribe((params) => {
      this.constructionId = params['id'];
    });
  }

  ngOnInit(): void {
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
    this.api.getConstructionDetailsById(this.constructionId, this.currentLang).subscribe({
      next: (p) => {
        this.project = p;
        this.filteredProjects = this.project;
        this.api.getConstructionDatesById(p.project_id, this.currentLang).subscribe((d) => {
          this.dates = d

        }
        )

      },
      error: (err) => {
        console.error('Error loading project details:', err);
      },
    });
  }
  getUnits(unittypeid: any) {
    if (unittypeid == null) {
      unittypeid = ''
    }

    this.api.getProjectUnits(this.constructionId, this.currentLang, unittypeid).subscribe((unit) => {
      this.units = unit;

    })
  }

  onImageError(event: any) {
    event.target.src = this.projectImage;
  }
  goBack() {
    this.location.back();
  }

  ondateSelect(event: any) {
    const selectedId = event.value;
   if (selectedId) {
    this.api.getConstructionDetailsById(1, this.currentLang).subscribe({
       next: (update) => {
        this.project.project = update.project;
        this.project.region_chain=update.region_chain;
          this.project.update_date = update.update_date;
          this.project.details = update.details;
          this.project.gallery_images = update.gallery_images;
          this.project.main_image = update.main_image;
          
        },
      error: (err) => console.error('Error loading filtered project:', err)
    });
  } else {
    this.getProject();
  }
}
}
