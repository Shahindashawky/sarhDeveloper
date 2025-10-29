import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../../services/api-service';
import { Facilities } from '../../../../model/Facilities';
import { Region } from '../../../../model/Region';
import { MessageService } from 'primeng/api';
import { LoadingService } from '../../../services/loading.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-create-project',
  standalone: false,
  templateUrl: './create-project.html',
  styleUrl: './create-project.scss'
})
export class CreateProject {
  projectForm!: FormGroup;
  imageName: string = 'choose file to upload by KB';
  imageName2: string = 'choose files to upload by KB';
  main_image!: File;
  gallery_images!: File[];
  image2!: FileList;
  pdfName: string = '';
  pdf: File | null = null;;
  region: Region[] = []
  type: any;
  statu: any;
  facilite: Facilities[] = [];

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
      region: this.api.getProjectRegions(),
      type: this.api.getProjectType(),
      statu: this.api.getProjectStatus(),
      facilite: this.api.getProjectFacilities()

    }).subscribe({
      next: (res) => {
        this.region = res.region;
        this.type = res.type;
        this.statu = res.statu;
        this.facilite = res.facilite;
        this.loadingService.hide();
      },
      error: (err) => {
        this.loadingService.hide();
        this.Message(err);
      }
    })

  }
  initializeForm(): void {
    this.projectForm = this.fb.group({
      english_name: ['', Validators.required],
      arabic_name: ['', Validators.required],
      main_image: [null, Validators.required],
      region_id: [null, Validators.required],
      types: ['', Validators.required],
      status: [null, Validators.required],
      facilities: ['', Validators.required],
      arabic_description: [''],
      english_description: [''],
      arabic_features: [''],
      english_features: [''],
      gallery_images: [null],
      pdf: [null],

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
  onPdfChange(event: any): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      if (file.type !== 'application/pdf') {
        this.pdf = null;
        this.pdfName = 'upload pdf';
        return;
      }

      this.pdf = file;
      this.pdfName = file.name;
    }
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
  createproject() {
  this.projectForm.markAllAsTouched();
  if (this.projectForm.invalid) {
    this.showWarn('Please fill all required fields.');
    return;
  }
    if (this.projectForm.valid) {
      let newproject: any = {
        region_id: this.projectForm.value.region_id?.id,
        english_name: this.projectForm.value.english_name,
        arabic_name: this.projectForm.value.arabic_name,
        main_image: this.main_image,
        types: this.projectForm.value.types.map((t: any) => t.id),
        status: this.projectForm.value.status?.id,
        facilities: this.projectForm.value.facilities.map((f: any) => f.id),
        arabic_description: this.projectForm.value.arabic_description,
        english_description: this.projectForm.value.english_description,
        arabic_features: this.projectForm.value.arabic_features,
        english_features: this.projectForm.value.english_features,
        gallery_images: this.gallery_images,
        pdf: this.pdf
      };
      let formData: any = new FormData();
      for (const key in newproject) {
        if (newproject.hasOwnProperty(key)) {
          const value = newproject[key];
          if (key === 'pdf' && !(value instanceof File)) continue;

          if (key === 'gallery_images' && !Array.isArray(value)) continue;

          if (Array.isArray(value)) {
            value.forEach((item) => formData.append(`${key}[]`, item));
            continue;
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

      this.api.addProject(formData).subscribe(
        (res: any) => {
          this.projectForm.reset();
          this.imageName = '';
          this.imageName2 = '';
          this.pdfName = '';
          this.showSuccess(res.message)

        },
        (err) => {
          this.Message(err.error.message);
        }
      );

    }
  }




}
