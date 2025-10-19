import { Component } from '@angular/core';
import { ApiService } from '../../../services/api-service';
import { LoadingService } from '../../../services/loading.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-view-construction-update',
  standalone: false,
  templateUrl: './view-construction-update.html',
  styleUrl: './view-construction-update.scss'
})
export class ViewConstructionUpdate {
  constructions!: [];
  constructor(private messageService: MessageService, private loadingService: LoadingService, private api: ApiService) { }
  ngOnInit() {
    this.loadingService.show();
    this.getdata();
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
  getdata() {
    this.loadingService.show();
    this.api.getALLConstructions().subscribe((r: any) => {
      this.constructions = r.data;
      this.loadingService.hide();
    })
  }
  onDelete(unitid: any) {
    this.api.deleteConstructionById(unitid).subscribe((r: any) => {
      this.getdata();
    })

  }
}
