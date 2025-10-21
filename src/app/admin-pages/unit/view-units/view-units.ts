import { Component } from '@angular/core';
import { ApiService } from '../../../services/api-service';
import { LoadingService } from '../../../services/loading.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-view-units',
  standalone: false,
  templateUrl: './view-units.html',
  styleUrl: './view-units.scss'
})
export class ViewUnits {
  units!: [];
  visible: boolean = false;

constructor(private confirmationService: ConfirmationService,private messageService: MessageService, private loadingService: LoadingService, private api: ApiService) { }
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
  showInfo(message: any) {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: message });
  }
  EditStatus(unitid: any) {
    this.api.updateunitStatus(unitid).subscribe((r: any) => {
      this.showSuccess(r.message)

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
      this.api.deleteUnitById(id).subscribe({
        next: (r: any) => {
        this.showSuccess(r.message);
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
