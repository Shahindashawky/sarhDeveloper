import { Component } from '@angular/core';
import { ApiService } from '../../../services/api-service';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-view-units',
  standalone: false,
  templateUrl: './view-units.html',
  styleUrl: './view-units.scss'
})
export class ViewUnits {
units!: [];
constructor(private loadingService:LoadingService,private api: ApiService) {}
ngOnInit() {
  this.loadingService.show();
        this.getdata();
    }
    getdata(){
        this.loadingService.show();
        this.api.getALLUnits().subscribe((r:any)=>{this.units=r.data;
          this.loadingService.hide();
        })
    }
    EditStatus(unitid: any) {
this.api.updateunitStatus(unitid).subscribe(r=>{
  console.log('updated status done',r);
  
})}

onDelete(unitid: any) {
  this.api.deleteUnitById(unitid).subscribe(r=>{ 
    this.getdata();
  })

}
}
