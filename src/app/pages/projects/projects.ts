import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/languageservice';
import { ApiService } from '../../services/api-service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-projects',
  standalone: false,
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects {
regionImage = '';
 currentLang: 'ar' | 'en' = 'ar';
projectList:any;

  constructor(private loadingService:LoadingService,private translate: TranslateService, private langService: LanguageService,private api:ApiService,private router:Router, private location: Location) { 
    this.regionImage=this.api.regionImage
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
  
  getProject(){
            this.loadingService.show();
  this.api.getProjectList(this.currentLang).subscribe(p=>{
this.projectList=p
        this.loadingService.hide();

  })
  }


  onImageError(event: any) {
    event.target.src = this.regionImage;
  }
  goToProject(id:any){
    this.router.navigate(['/region-details', id]);
  }
        goBack() {
  this.location.back();
}
}
