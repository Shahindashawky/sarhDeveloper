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
facilityImage:any;
constructor(private api: ApiService) {}
ngOnInit() {
        this.api.getALLFacilitie().subscribe((r:any)=>{this.facilities=r.data;
          
        })
       this.facilityImage= this.api.facilityImage
    }
onImageError(event: any) {
  event.target.src = this.facilityImage;
}
EditStatus(facilitieid: any){
this.api.updatefacilitieStatus(facilitieid).subscribe(r=>{
  console.log('updated status done',r);
  
})
}
onDelete(facilitieid: any) {
  this.api.deleteFacilitieById(facilitieid).subscribe(f=>{})
}
}
