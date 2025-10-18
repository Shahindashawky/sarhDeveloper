import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Project } from '../../../../model/Project';
import { ApiService } from '../../../services/api-service';
import { MessageService } from 'primeng/api';
import { LoadingService } from '../../../services/loading.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-create-construction-update',
  standalone: false,
  templateUrl: './create-construction-update.html',
  styleUrl: './create-construction-update.scss'
})
export class CreateConstructionUpdate {
  constructionupdateForm!: FormGroup;
  imageName: string = 'choose file to upload';
  imageName2: string = 'choose files to upload ';
  main_image!: File;
  gallery_images!: File[];
  image2!: FileList;
  pdfName: string = '';
  isLoading: boolean = false;
  project: Project[] = []
  status: any;

  constructor(private loadingService: LoadingService,
    private api: ApiService,
    private fb: FormBuilder, private messageService: MessageService
  ) {


  }
  ngOnInit() {
    this.loadingService.show();
    this.initializeForm();
    this.getdata();

  }
  getdata() {
    this.loadingService.show();
    forkJoin({
      project: this.api.getconstructionUpdateProject(),
      status: this.api.getconstructionUpdatestatus()
    }).subscribe({
      next: (res) => {
        this.project = res.project;
        this.status = res.status;
        this.loadingService.hide();
      }, error: (err) => {
        this.loadingService.hide();
      }
    })
  }
  initializeForm(): void {
    this.constructionupdateForm = this.fb.group({
      main_image: [null, Validators.required],
      project_id: [null, Validators.required],
      status: [null, Validators.required],
      update_date: [[], Validators.required],
      arabic_details: ['', Validators.required],
      english_details: ['', Validators.required],
      gallery_images: [null],


    });
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

  convertData(date: Date | Date[]): string[] {
    if (!date) return [];

    if (date instanceof Date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return [`${year}-${month}-${day}`];
    }

    return date.map((d) => {
      const dateObj = new Date(d);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    });
  }

  onImageChange(event: any): void {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files[0]) {
      this.main_image = fileInput.files[0];
      const fileName = fileInput.files[0].name;
      this.imageName = fileName;
    }
  }
  onImageChangepartners(event: any): void {
    const fileInput2 = event.target as HTMLInputElement;
    if (fileInput2?.files && fileInput2.files.length > 0) {
      this.image2 = fileInput2.files;
    }
    this.gallery_images = [];
    for (let index = 0; index < this.image2.length; index++) {
      const element = this.image2[index];
      this.gallery_images.push(element);
    }
    this.imageName2 = 'upload now';
  }


  createconstructionupdate() {
    if (this.constructionupdateForm.valid) {
      this.isLoading = true;
      let newunit: any = {
        project_id: this.constructionupdateForm.value.project_id?.id,
        main_image: this.main_image,
        status: this.constructionupdateForm.value.status?.id,
        arabic_details: this.constructionupdateForm.value.arabic_details,
        english_details: this.constructionupdateForm.value.english_details,
        gallery_images: this.gallery_images,
        update_date: this.convertData(this.constructionupdateForm.value.update_date),
      };
      let formData: any = new FormData();
      for (const key in newunit) {
        if (newunit.hasOwnProperty(key)) {
          const value = newunit[key];
          if (Array.isArray(value)) {
            if (key === 'update_date') {
              formData.append(key, value[0]);
            } else {
              value.forEach((item) => formData.append(`${key}[]`, item));
            }
          }

          if (typeof value === 'string' || typeof value === 'boolean' ||
            typeof value === 'number') {
            formData.append(key, String(value));
          } else if (value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, value);
          }
        }
      }

      this.api.addConstructionUpdate(formData).subscribe(
        (res: any) => {
          this.constructionupdateForm.reset();
          this.isLoading = false;
          this.showSuccess(res.message)

        }, (error: any) => {
          this.Message(error.error.message)
        }
      );

    }
  }


}
