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
    onEdit(projectid: any) {
  console.log('Editing projects:', projectid);
  // هنا ممكن تفتحي Dialog أو تروحي لصفحة edit
  // this.router.navigate(['/admin-home/edit-projects', projects.id]);
}

onDelete(projectid: any) {
  console.log('Deleting projects:', projectid);
  // هنا ضيفي تأكيد قبل الحذف مثلاً
  // this.confirmationService.confirm({
  //   message: `Are you sure you want to delete ${facilities.english_name}?`,
  //   accept: () => this.api.deletefacilities(facilities.id).subscribe(...)
  // });
}
}
