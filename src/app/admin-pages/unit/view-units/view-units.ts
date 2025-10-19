import { Component } from '@angular/core';
import { ApiService } from '../../../services/api-service';
import { LoadingService } from '../../../services/loading.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-view-units',
  standalone: false,
  templateUrl: './view-units.html',
  styleUrl: './view-units.scss'
})
export class ViewUnits {
  units!: [];
  constructor(private messageService: MessageService, private loadingService: LoadingService, private api: ApiService) { }
  ngOnInit() {
    this.loadingService.show();
    this.getdata();
  }
  getdata() {
    this.loadingService.show();
    this.api.getALLUnits().subscribe((r: any) => {
      this.units = r.data;
      this.loadingService.hide();
    })
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
  EditStatus(unitid: any) {
    this.api.updateunitStatus(unitid).subscribe((r: any) => {
      this.showSuccess(r.message)

    })
  }

  onDelete(unitid: any) {
    this.api.deleteUnitById(unitid).subscribe(r => {
      this.getdata();
    })

  }
}
