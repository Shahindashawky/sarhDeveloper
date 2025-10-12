import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../../services/api-service';
import { LanguageService } from '../../../services/languageservice';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-region-details',
  standalone: false,
  templateUrl: './region-details.html',
  styleUrl: './region-details.scss'
})
export class RegionDetails {
regionImage = '';
 currentLang: 'ar' | 'en' = 'ar';
regionList:any;
regionId:any;
regionTitle:any;

  constructor(private translate: TranslateService, private langService: LanguageService,private api:ApiService, private route: ActivatedRoute) { 
    this.regionImage=this.api.regionImage;
  this.route.params.subscribe((params) => {
      this.regionId = params['id'];
    });

  }

  ngOnInit(): void {
        this.langService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });
      this.api.getProjectList(this.currentLang).subscribe(p=>{
        p.filter((f:any)=>f.id==this.regionId).map((a:any)=>{this.regionTitle=a.name})
    
  })
    this.getProject();
      this.translate.onLangChange.subscribe(() => {
      this.getProject();
    });
  }
  
  getProject(){
  this.api.getRegionDetails(this.regionId,this.currentLang).subscribe(p=>{
this.regionList=p
  })
  }


  onImageError(event: any) {
    event.target.src = this.regionImage;
  }
}
