import { Component } from '@angular/core';
import { Facilities } from '../../../../model/Facilities';
import { ApiService } from '../../../services/api-service';

@Component({
  selector: 'app-view-facilities',
  standalone: false,
  templateUrl: './view-facilities.html',
  styleUrl: './view-facilities.scss'
})
export class ViewFacilities {
facilities!: Facilities[];
constructor(private api: ApiService) {}
ngOnInit() {
        this.api.getALLFacilitie().subscribe((r:any)=>{this.facilities=r.data;
          
        })
    }


onDelete(facilitieid: any) {
  console.log('Deleting facilities:', facilitieid);
  // هنا ضيفي تأكيد قبل الحذف مثلاً
  // this.confirmationService.confirm({
  //   message: `Are you sure you want to delete ${facilities.english_name}?`,
  //   accept: () => this.api.deletefacilities(facilities.id).subscribe(...)
  // });
}
}
