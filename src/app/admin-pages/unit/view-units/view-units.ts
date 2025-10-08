import { Component } from '@angular/core';
import { ApiService } from '../../../services/api-service';

@Component({
  selector: 'app-view-units',
  standalone: false,
  templateUrl: './view-units.html',
  styleUrl: './view-units.scss'
})
export class ViewUnits {
units!: [];
constructor(private api: ApiService) {}
ngOnInit() {
        this.api.getALLUnits().subscribe((r:any)=>{this.units=r.data;
          
        })
    }
    onEdit(unitid: any) {
  console.log('Editing units:', unitid);
  // هنا ممكن تفتحي Dialog أو تروحي لصفحة edit
  // this.router.navigate(['/admin-home/edit-units', units.id]);
}

onDelete(unitid: any) {
  console.log('Deleting units:', unitid);
  // هنا ضيفي تأكيد قبل الحذف مثلاً
  // this.confirmationService.confirm({
  //   message: `Are you sure you want to delete ${facilities.english_name}?`,
  //   accept: () => this.api.deletefacilities(facilities.id).subscribe(...)
  // });
}
}
