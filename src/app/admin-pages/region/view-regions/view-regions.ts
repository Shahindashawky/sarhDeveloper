import { Component } from '@angular/core';
import { Region } from '../../../../model/Region';
import { ApiService } from '../../../services/api-service';
import { LoadingService } from '../../../services/loading.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-view-regions',
  standalone: false,
  templateUrl: './view-regions.html',
  styleUrl: './view-regions.scss'
})
export class ViewRegions {
regions!: Region[];
regionImage:any;
constructor(private messageService: MessageService,private loadingService:LoadingService,private api: ApiService) {}
ngOnInit() {
  this.loadingService.show();
    
        this.regionImage=this.api.regionImage;
        this.getdata()
    }
      Message(message: any) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });

  }
  showSuccess(message: any) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }
  showWarn(message: any) {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: message });
  }
    getdata(){
      this.loadingService.show();
        this.api.getALLRegions().subscribe((r:any)=>{this.regions=r.data;
 this.loadingService.hide();
        })
    }
onImageError(event: any) {
  event.target.src = this.regionImage;
}
EditStatus(regionid: any){
this.api.updateregionStatus(regionid).subscribe((r:any)=>{
  this.showSuccess(r.message)
  
})
}
onDelete(regionid: any) {
  this.api.deleteregionById(regionid).subscribe(r=>{
    this.getdata()
   })

}

}
