import { Component } from '@angular/core';
import { Region } from '../../../../model/Region';
import { ApiService } from '../../../services/api-service';

@Component({
  selector: 'app-view-regions',
  standalone: false,
  templateUrl: './view-regions.html',
  styleUrl: './view-regions.scss'
})
export class ViewRegions {
regions!: Region[];
constructor(private api: ApiService) {}
ngOnInit() {
        this.api.getALLRegions().subscribe((r:any)=>{this.regions=r.data;
          
        })
    }


onDelete(region: any) {
  console.log('Deleting region:', region);
  // هنا ضيفي تأكيد قبل الحذف مثلاً
  // this.confirmationService.confirm({
  //   message: `Are you sure you want to delete ${region.english_name}?`,
  //   accept: () => this.api.deleteRegion(region.id).subscribe(...)
  // });
}

}
