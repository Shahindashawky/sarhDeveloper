import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Project } from '../../../../model/Project';
import { ApiService } from '../../../services/api-service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoadingService } from '../../../services/loading.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-edit-construction-update',
  standalone: false,
  templateUrl: './edit-construction-update.html',
  styleUrl: './edit-construction-update.scss'
})
export class EditConstructionUpdate {
  constructionupdateForm!: FormGroup;
  imageName: string = 'choose file to upload by KB';
  imageName2: string = 'choose files to upload by KB';
  main_image!: File;
  gallery_images!: File[];
  image2!: FileList;
  pdfName: string = '';
  project: Project[] = []
  status: any;
  constId!: any;

  constructor(private loadingService: LoadingService,
    private api: ApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute,private messageService: MessageService
  ) {
    this.route.params.subscribe((params) => {
      this.constId = params['id'];
    });

  }
  ngOnInit() {
    this.loadingService.show();
    this.initializeForm();
    this.getdata();
    this.api.getConstructionById(this.constId).subscribe((res: any) => {
      const construction: any = res;

      this.constructionupdateForm.patchValue({
        project_id: construction.project_id,
        status: construction.status,
        update_date: construction.update_date,
        arabic_details: construction.arabic_details,
        english_details: construction.english_details,

      });
      this.loadingService.hide();
    })
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
      }
    })
  }
  initializeForm(): void {
    this.constructionupdateForm = this.fb.group({
      main_image: [null],
      project_id: [null, Validators.required],
      status: [null, Validators.required],
      update_date: [[]],
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

convertData(date: any): string[] {
  if (!date) return [];

  if (typeof date === 'string') {
    return [date];
  }

  if (date instanceof Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return [`${year}-${month}-${day}`];
  }

  if (Array.isArray(date)) {
    return date.map((d) => {
      const dateObj = new Date(d);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    });
  }

  return [];
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


  editconstructionupdate() {
        this.constructionupdateForm.markAllAsTouched();

  if (this.constructionupdateForm.invalid) {
    this.showWarn('Please fill all required fields.');
    return;
  }
    if (this.constructionupdateForm.valid) {
      let construction: any = {
        project_id: this.constructionupdateForm.value.project_id,
        main_image: this.main_image,
        status: this.constructionupdateForm.value.status,
        arabic_details: this.constructionupdateForm.value.arabic_details,
        english_details: this.constructionupdateForm.value.english_details,
        gallery_images: this.gallery_images,
        update_date: this.convertData(this.constructionupdateForm.value.update_date),
      };
      let formData: any = new FormData();
      for (const key in construction) {
        if (construction.hasOwnProperty(key)) {
          const value = construction[key];
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

           this.api.updateconstruction(this.constId ,formData).subscribe(
        (res: any) => {
            this.constructionupdateForm.reset();
            this.imageName="";
            this.imageName2="";
        this.showSuccess(res.message)         
        },
  (err) => {
    this.Message(err.error.message)
  }
      );

    }
  }
}
