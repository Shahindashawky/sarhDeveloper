import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Facilities } from '../../../../model/Facilities';
import { Region } from '../../../../model/Region';
import { ApiService } from '../../../services/api-service';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../../../model/Project';
import { MessageService } from 'primeng/api';
import { LoadingService } from '../../../services/loading.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-edit-project',
  standalone: false,
  templateUrl: './edit-project.html',
  styleUrl: './edit-project.scss'
})
export class EditProject {
  projectForm!: FormGroup;
  imageName: string = 'choose file to upload';
  imageName2: string = 'choose files to upload ';
  main_image!: File;
  gallery_images!: File[];
  image2!: FileList;
  pdfName: string = '';
  pdf: File | null = null;
  region: Region[] = []
  type: any;
  statu: any;
  facilite: Facilities[] = [];
  projectId!: any;

  constructor(private loadingService: LoadingService,
    private api: ApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute, private messageService: MessageService
  ) {
    this.route.params.subscribe((params) => {
      this.projectId = params['id'];
    });

  }
  ngOnInit() {
    this.loadingService.show();
    this.initializeForm();
    this.getdata();
    this.api.getProjectById(this.projectId).subscribe((res: any) => {
      const project: Project = res;

      this.projectForm.patchValue({
        english_name: project.english_name,
        arabic_name: project.arabic_name,
        region_id: project.region_id,
        types: project.types.map((t: any) => t.id),
        status: project.status,
        facilities: project.facilities.map((f: any) => f.id),
        arabic_description: project.arabic_description,
        english_description: project.english_description,
        arabic_features: project.arabic_features,
        english_features: project.english_features,
      });
    })
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
  Message(message: any) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });

  }
  showSuccess(message: any) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }
  showWarn(message: any) {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: message });
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

  editproject() {
    if (this.projectForm.valid) {
      let newproject: any = {
        region_id: this.projectForm.value.region_id,
        english_name: this.projectForm.value.english_name,
        arabic_name: this.projectForm.value.arabic_name,
        main_image: this.main_image,
        types: this.projectForm.value.types,
        status: this.projectForm.value.status,
        facilities: this.projectForm.value.facilities,
        arabic_description: this.projectForm.value.arabic_description,
        english_description: this.projectForm.value.english_description,
        arabic_features: this.projectForm.value.arabic_features,
        english_features: this.projectForm.value.english_features,
        gallery_images: this.gallery_images,


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
      for (let pair of formData.entries()) {
  console.log(pair[0] + ':', pair[1]);
}

      this.api.updateProject(this.projectId, formData).subscribe(
        (res: any) => {
          this.projectForm.reset();
          this.imageName = '',
            this.imageName2 = '';
          this.pdfName = '';
          this.showSuccess(res.message)
        },
        (err) => {
          this.Message(err.error.message)
        }
      );

    }
  }
}
