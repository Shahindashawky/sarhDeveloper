import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../services/api-service';
import { LanguageService } from '../../services/languageservice';
import { Location } from '@angular/common';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-followup',
  standalone: false,
  templateUrl: './followup.html',
  styleUrl: './followup.scss'
})
export class Followup {
projectImage = '';
  currentLang: 'ar' | 'en' = 'ar';
  projects: any;
  filteredProjects: any[] = [];
  selectedProject: any = null;

  constructor(private loadingService:LoadingService,private translate: TranslateService, private langService: LanguageService, private api: ApiService, private route: ActivatedRoute, private router: Router, private location: Location) {
    this.projectImage = this.api.projectImage;

  }

  ngOnInit(): void {
    this.loadingService.show();
    this.langService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });

    this.getProject();
    this.translate.onLangChange.subscribe(() => {
      this.getProject();
    });
  }


  getProject() {
    this.loadingService.show();
    this.api.getConstructionUpdate(this.currentLang).subscribe(p => {
      this.projects = p.data;
      this.filteredProjects = this.projects;
      this.loadingService.hide();
    })
  }

  onProjectSelect(event: any) {
    const selectedId = event.value;
    if (selectedId) {
      this.filteredProjects = this.projects.filter((p: any) => p.id === selectedId);
    } else {
      this.filteredProjects = this.projects;
    }
  }

  onImageError(event: any) {
    event.target.src = this.projectImage;
  }
  goToProject(id: any) {
    this.router.navigate(['/construction-details', id]);
  }
  goBack() {
    this.location.back();
  }
}
