import { Component } from '@angular/core';
import { ApiService } from '../../../services/api-service';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-view-construction-update',
  standalone: false,
  templateUrl: './view-construction-update.html',
  styleUrl: './view-construction-update.scss'
})
export class ViewConstructionUpdate {
constructions!: [];
constructor(private loadingService:LoadingService,private api: ApiService) {}
ngOnInit() {
this.loadingService.show();
 this.getdata();
    }

getdata(){
  this.loadingService.show();
        this.api.getALLConstructions().subscribe((r:any)=>{this.constructions=r.data;
          this.loadingService.hide();
        })
}
onDelete(unitid: any) {
  this.api.deleteConstructionById(unitid).subscribe(r=>{ 
     this.getdata();
  })

}
}
