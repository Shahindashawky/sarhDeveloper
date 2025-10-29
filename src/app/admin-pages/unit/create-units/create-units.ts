import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../../services/api-service';
import { Project } from '../../../../model/Project';
import { LoadingService } from '../../../services/loading.service';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-create-units',
  standalone: false,
  templateUrl: './create-units.html',
  styleUrl: './create-units.scss'
})
export class CreateUnits {
  unitsForm!: FormGroup;
  imageName: string = 'choose file to upload by KB';
  imageName2: string = 'choose files to upload by KB';
  main_image!: File;
  gallery_images!: File[];
  image2!: FileList;
  pdfName: string = '';
  pdf!: File;
  project: Project[] = []
  type: any;
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
      project: this.api.getunitsProjects(),
      status: this.api.getUnitsStatus(),
      type: this.api.getUnitsType()
    }).subscribe({
      next: (res) => {
        this.project = res.project;
        this.status = res.status;
        this.type = res.type;
        this.loadingService.hide();
      }
    })
  }

  initializeForm(): void {
    this.unitsForm = this.fb.group({
      english_name: ['', Validators.required],
      arabic_name: ['', Validators.required],
      main_image: [null, Validators.required],
      project_id: [null, Validators.required],
      unit_type_id: ['', Validators.required],
      status: [null, Validators.required],
      arabic_details: [''],
      english_details: [''],
      area: [''],
      rooms: [''],
      bathrooms: [''],
      price: [''],
      map_url: [''],
      english_finishing: [''],
      arabic_finishing: [''],
      english_floor: [''],
      arabic_floor: [''],
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


  createunits() {
 this.unitsForm.markAllAsTouched();
  if (this.unitsForm.invalid) {
    this.showWarn('Please fill all required fields.');
    return;
  }
    if (this.unitsForm.valid) {
      let newunit: any = {
        project_id: this.unitsForm.value.project_id?.id,
        english_name: this.unitsForm.value.english_name,
        arabic_name: this.unitsForm.value.arabic_name,
        main_image: this.main_image,
        unit_type_id: this.unitsForm.value.unit_type_id?.id,
        status: this.unitsForm.value.status?.id,
        arabic_details: this.unitsForm.value.arabic_details,
        english_details: this.unitsForm.value.english_details,
        area: this.unitsForm.value.area,
        rooms: this.unitsForm.value.rooms,
        bathrooms: this.unitsForm.value.bathrooms,
        price: this.unitsForm.value.price,
        map_url: this.unitsForm.value.map_url,
        english_finishing: this.unitsForm.value.english_finishing,
        arabic_finishing: this.unitsForm.value.arabic_finishing,
        english_floor: this.unitsForm.value.english_floor,
        arabic_floor: this.unitsForm.value.arabic_floor,
        gallery_images: this.gallery_images,

      };
      let formData: any = new FormData();
      for (const key in newunit) {
        if (newunit.hasOwnProperty(key)) {
          const value = newunit[key];
          if (key === 'gallery_images' && !Array.isArray(value)) continue;
          if (Array.isArray(value)) {
            value.forEach((item) => formData.append(`${key}[]`, item));
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

      this.api.addUnits(formData).subscribe(
        (res: any) => {
          this.unitsForm.reset();
          this.imageName = '';
          this.imageName2 = '';
          this.showSuccess(res.message)
        }, (err) => {
          this.Message(err.error.message)
        }
      );

    }
  }


}
