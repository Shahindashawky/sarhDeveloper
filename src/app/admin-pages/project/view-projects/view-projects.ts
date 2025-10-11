import { Component } from '@angular/core';
import { Project } from '../../../../model/Project';
import { ApiService } from '../../../services/api-service';

@Component({
  selector: 'app-view-projects',
  standalone: false,
  templateUrl: './view-projects.html',
  styleUrl: './view-projects.scss'
})
export class ViewProjects {
projects!: Project[];
constructor(private api: ApiService) {}
ngOnInit() {
        this.api.getALLProjects().subscribe((r:any)=>{this.projects=r.data;
          
        })
    }
EditStatus(regionid: any){
this.api.updateprojectStatus(regionid).subscribe(r=>{
  console.log('updated status done',r);
  
})
}

onDelete(projectid: any) {
  this.api.deleteProjectById(projectid).subscribe(r=>{ })

}
}
