import { Component } from '@angular/core';
import { Project } from '../../../../model/Project';
import { ApiService } from '../../../services/api-service';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-view-projects',
  standalone: false,
  templateUrl: './view-projects.html',
  styleUrl: './view-projects.scss'
})
export class ViewProjects {
projects!: Project[];
constructor(private loadingService:LoadingService,private api: ApiService) {}
ngOnInit() {
  this.loadingService.show();
       this.getdata();
    }
    getdata(){
       this.loadingService.show();
        this.api.getALLProjects().subscribe((r:any)=>{this.projects=r.data;
          this.loadingService.hide();
        })
    }
EditStatus(regionid: any){
this.api.updateprojectStatus(regionid).subscribe(r=>{
  console.log('updated status done',r);
  
})
}

onDelete(projectid: any) {
  this.api.deleteProjectById(projectid).subscribe(r=>{ 
    this.getdata();
  })
 
}
}
