import { Component } from '@angular/core';
import { ApiService } from '../../../services/api-service';

@Component({
  selector: 'app-view-construction-update',
  standalone: false,
  templateUrl: './view-construction-update.html',
  styleUrl: './view-construction-update.scss'
})
export class ViewConstructionUpdate {
constructions!: [];
constructor(private api: ApiService) {}
ngOnInit() {

        this.api.getALLConstructions().subscribe((r:any)=>{this.constructions=r.data;
          
        })
    }


onDelete(unitid: any) {
  this.api.deleteConstructionById(unitid).subscribe(r=>{ })

}
}
