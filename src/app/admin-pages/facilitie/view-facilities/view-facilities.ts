import { Component } from '@angular/core';
import { Facilities } from '../../../../model/Facilities';
import { ApiService } from '../../../services/api-service';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-view-facilities',
  standalone: false,
  templateUrl: './view-facilities.html',
  styleUrl: './view-facilities.scss'
})
export class ViewFacilities {
facilities!: Facilities[];
facilityImage:any;
constructor(private loadingService:LoadingService,private api: ApiService) {}
ngOnInit() {
  this.loadingService.show();
    this.getdata();
       this.facilityImage= this.api.facilityImage
    }
    getdata(){
        this.loadingService.show();
        this.api.getALLFacilitie().subscribe((r:any)=>{this.facilities=r.data;
          this.loadingService.hide();
        })
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
  this.api.deleteFacilitieById(facilitieid).subscribe(f=>{
    this.getdata();
  })
}
}
