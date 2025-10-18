import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../../services/api-service';
import { LanguageService } from '../../../services/languageservice';
import { Location } from '@angular/common';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-project-details',
  standalone: false,
  templateUrl: './project-details.html',
  styleUrl: './project-details.scss'
})
export class ProjectDetails {
projectImage = '';
currentLang: 'ar' | 'en' = 'ar';
projects:any;
regionId:any;
regionTitle:any;
filteredProjects: any[] = []; 
selectedProject: any = null; 

  constructor(private loadingService:LoadingService,private translate: TranslateService, private langService: LanguageService,private api:ApiService, private route: ActivatedRoute, private router: Router, private location: Location) { 
    this.projectImage=this.api.projectImage;
    this.route.params.subscribe((params) => {
      this.regionId = params['id'];
    });

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
  onProjectSelect(event: any) {
  const selectedId = event.value;
  if (selectedId) {
    this.filteredProjects = this.projects.filter((p:any) => p.id === selectedId);
  } else {
    this.filteredProjects = this.projects;

  }
}
  getProject(){
    this.loadingService.show();
  this.api.getRegionDetails(this.regionId,this.currentLang).subscribe(p=>{
this.projects=p;
this.filteredProjects = this.projects;
this.regionTitle=this.projects[0].region[0];
this.loadingService.hide();
  })
  }


  onImageError(event: any) {
    event.target.src = this.projectImage;
  }
    goToProject(id: any) {
    this.router.navigate(['/view-project-details', id]);
  }
    goBack() {
  this.location.back();
}
}
