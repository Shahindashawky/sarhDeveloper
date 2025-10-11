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

EditStatus(regionid: any){
this.api.updateregionStatus(regionid).subscribe(r=>{
  console.log('updated status done',r);
  
})
}
onDelete(regionid: any) {
  this.api.deleteregionById(regionid).subscribe(r=>{ })

}

}
