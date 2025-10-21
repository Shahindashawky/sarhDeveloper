import { Component } from '@angular/core';
import { ApiService } from '../../../services/api-service';
import { LoadingService } from '../../../services/loading.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-view-construction-update',
  standalone: false,
  templateUrl: './view-construction-update.html',
  styleUrl: './view-construction-update.scss'
})
export class ViewConstructionUpdate {
  constructions!: [];
  visible: boolean = false;

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private loadingService: LoadingService, private api: ApiService) { }
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
   showInfo(message: any) {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: message });
  }
  getdata() {
    this.loadingService.show();
    this.api.getALLConstructions().subscribe((r: any) => {
      this.constructions = r.data;
      this.loadingService.hide();
    })
  }

Delete(id: any) {
   this.visible=true;
  this.confirmationService.confirm({
    header: 'Confirm Delete',
    message: 'Are you sure you want to delete this record?',
    icon: 'pi pi-exclamation-triangle',
    rejectLabel: 'Cancel',
    rejectButtonProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true,
    },
    acceptButtonProps: {
      label: 'Delete',
      severity: 'danger',
    },

    accept: () => {
      this.api.deleteConstructionById(id).subscribe({
        next: (r: any) => {
        this.showSuccess('Record deleted successfully');
        this.getdata();
        },
        error: () => {
          this.confirmationService.close()
        }
      });
    },

    reject: () => {
      this.showInfo('Deletion cancelled')
       this.confirmationService.close();
    },
  });
}



}
