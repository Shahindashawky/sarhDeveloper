import { Component, DOCUMENT, Inject, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../../services/api-service';
import { Facilities } from '../../../../model/Facilities';
import { Region } from '../../../../model/Region';

@Component({
  selector: 'app-create-project',
  standalone: false,
  templateUrl: './create-project.html',
  styleUrl: './create-project.scss'
})
export class CreateProject {
  projectForm!: FormGroup;
  imageName: string = 'choose file to upload';
  imageName2: string = 'choose files to upload ';
  main_image!: File;
  gallery_images!: File[];
  image2!: FileList;
  pdfName: string = '';
  pdf!: File;
  isLoading: boolean = false;
  region: Region[] = []
  type: any;
  statu: any;
  facilite: Facilities[] = [];

  constructor(
    private api: ApiService,
    private fb: FormBuilder
  ) {


  }
  ngOnInit() {
    this.initializeForm();
    this.api.getProjectRegions().subscribe((data: Region[]) => {
      this.region = data
    })
    this.api.getProjectType().subscribe((data: any) => {
      this.type = data
    })
    this.api.getProjectStatus().subscribe((data: any) => {
      this.statu = data
    })
    this.api.getProjectFacilities().subscribe((data: Facilities[]) => {
      this.facilite = data
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
      gallery_images: [null, Validators.required],
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
    const fileInput = event.target;
    if (fileInput.files && fileInput.files[0]) {
      this.pdf = fileInput.files[0];
      const fileName = fileInput.files[0].name;
      this.pdfName = fileName;
    }
  }

  createproject() {
    if (this.projectForm.valid) {
      this.isLoading = true;
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
        gallery_images: this.gallery_images,
        pdf: this.pdf

      };
      let formData: any = new FormData();
      for (const key in newproject) {
        if (newproject.hasOwnProperty(key)) {
          const value = newproject[key];
          if (Array.isArray(value)) {
            value.forEach((item) => formData.append(`${key}[]`, item));
          }
          if (typeof value === 'string' || typeof value === 'boolean' ||
  typeof value === 'number') {
            formData.append(key, String(value));
          } else if (value instanceof File) {
            formData.append(key, value);
          } else {
            console.warn(`Unsupported data type for key: ${key}`);
          }
        }
      }
      console.log(newproject);

      this.api.addProject(formData).subscribe(
              (res: any) => {
                  this.projectForm.reset();
                this.isLoading = false;
                console.log("done")

              }
            );

    }
  }




}
