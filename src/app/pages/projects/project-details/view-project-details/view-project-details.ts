import { Component ,model, signal} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../../services/languageservice';
import { ApiService } from '../../../../services/api-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-project-details',
  standalone: false,
  templateUrl: './view-project-details.html',
  styleUrl: './view-project-details.scss'
})
export class ViewProjectDetails {
projectImage = '';
  currentLang: 'ar' | 'en' = 'ar';
  projectId: any;
  project: any;
images = model<string[]>([]);

  constructor(
    private translate: TranslateService,
    private langService: LanguageService,
    private api: ApiService,
    private route: ActivatedRoute,
  ) {
    this.projectImage = this.api.projectImage;
    this.route.params.subscribe((params) => {
      this.projectId = params['id'];
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
    this.api.getProjectDetails(this.projectId, this.currentLang).subscribe({
      next: (p) => {
        this.project = p;
        const gallery = Array.isArray(p.gallery_images) ? p.gallery_images : [];
    if (p.main_image) {
      this.images.set([p.main_image, ...gallery]);
    } else {
      this.images.set(gallery);
    }
      },
      error: (err) => {
        console.error('Error loading project details:', err);
      },
    });
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
}
