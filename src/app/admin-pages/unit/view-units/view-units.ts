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
    EditStatus(unitid: any) {
this.api.updateunitStatus(unitid).subscribe(r=>{
  console.log('updated status done',r);
  
})}

onDelete(unitid: any) {
  this.api.deleteUnitById(unitid).subscribe(r=>{ })

}
}
