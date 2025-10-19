import { Component } from '@angular/core';
import { Project } from '../../../../model/Project';
import { ApiService } from '../../../services/api-service';
import { LoadingService } from '../../../services/loading.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-view-projects',
  standalone: false,
  templateUrl: './view-projects.html',
  styleUrl: './view-projects.scss'
})
export class ViewProjects {
  projects!: Project[];
  constructor(private messageService: MessageService, private loadingService: LoadingService, private api: ApiService) { }
  ngOnInit() {
    this.loadingService.show();
    this.getdata();
  }
  getdata() {
    this.loadingService.show();
    this.api.getALLProjects().subscribe((r: any) => {
      this.projects = r.data;
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
  EditStatus(regionid: any) {
    this.api.updateprojectStatus(regionid).subscribe((r:any) => {
  this.showSuccess(r.message)

    })
  }

  onDelete(projectid: any) {
    this.api.deleteProjectById(projectid).subscribe(r => {
      this.getdata();
    })

  }
}
