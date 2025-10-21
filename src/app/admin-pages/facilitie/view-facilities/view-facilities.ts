import { Component } from '@angular/core';
import { Facilities } from '../../../../model/Facilities';
import { ApiService } from '../../../services/api-service';
import { LoadingService } from '../../../services/loading.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-view-facilities',
  standalone: false,
  templateUrl: './view-facilities.html',
  styleUrl: './view-facilities.scss'
})
export class ViewFacilities {
  facilities!: Facilities[];
  facilityImage: any;
  visible: boolean = false;

constructor(private confirmationService: ConfirmationService,private loadingService: LoadingService, private api: ApiService, private messageService: MessageService) { }
  ngOnInit() {
    this.loadingService.show();
    this.getdata();
    this.facilityImage = this.api.facilityImage
  }
  getdata() {
    this.loadingService.show();
    this.api.getALLFacilitie().subscribe((r: any) => {
      this.facilities = r.data;
      this.loadingService.hide();
    })
  }
  onImageError(event: any) {
    event.target.src = this.facilityImage;
  }
  EditStatus(facilitieid: any) {
    this.api.updatefacilitieStatus(facilitieid).subscribe((r: any) => {
      this.showSuccess(r.message)
    })
  }
  onDelete(facilitieid: any) {
    this.api.deleteFacilitieById(facilitieid).subscribe((f: any) => {
      this.showSuccess(f.message)
      this.getdata();
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
      this.api.deleteFacilitieById(id).subscribe({
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
