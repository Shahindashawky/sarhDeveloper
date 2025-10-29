import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Project } from '../../../../model/Project';
import { ApiService } from '../../../services/api-service';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '../../../services/loading.service';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-edit-unit',
  standalone: false,
  templateUrl: './edit-unit.html',
  styleUrl: './edit-unit.scss'
})
export class EditUnit {
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
  unitId!: any;
  constructor(private loadingService: LoadingService,
    private api: ApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute, private messageService: MessageService
  ) {
    this.route.params.subscribe((params) => {
      this.unitId = params['id'];
    });
  }
  ngOnInit() {
    this.loadingService.show();

    this.initializeForm();
  this.getdata()
    this.api.getUnitById(this.unitId).subscribe((res: any) => {
      const unit: any = res;
      this.unitsForm.patchValue({
        english_name: unit.english_name,
        arabic_name: unit.arabic_name,
        project_id: unit.project_id,
        unit_type_id: unit.unit_type_id,
        status: unit.status,
        arabic_details: unit.arabic_details,
        english_details: unit.english_details,
        area: unit.area,
        rooms: unit.rooms,
        bathrooms: unit.bathrooms,
        price: unit.price,
        map_url: unit.map_url,
        english_finishing: unit.english_finishing,
        arabic_finishing: unit.arabic_finishing,
        english_floor: unit.english_floor,
        arabic_floor: unit.arabic_floor,
      });
    })
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
      main_image: [null],
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

  Message(message: any) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });

  }
  showSuccess(message: any) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }
  showWarn(message: any) {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: message });
  }
  editunits() {
     this.unitsForm.markAllAsTouched();
  if (this.unitsForm.invalid) {
    this.showWarn('Please fill all required fields.');
    return;
  }
    if (this.unitsForm.valid) {
      let newunit: any = {
        project_id: this.unitsForm.value.project_id,
        english_name: this.unitsForm.value.english_name,
        arabic_name: this.unitsForm.value.arabic_name,
        main_image: this.main_image,
        unit_type_id: this.unitsForm.value.unit_type_id,
        status: this.unitsForm.value.status,
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
        if (!newunit.hasOwnProperty(key)) continue;
        const value = newunit[key];
          if (key === 'gallery_images' && !Array.isArray(value)) continue;
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            formData.append(`${key}[${index}]`, item);
          });
        } else if (value instanceof File) {
          formData.append(key, value);
        } else if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      }


      this.api.updateunit(this.unitId, formData).subscribe(
        (res: any) => {
          this.unitsForm.reset();
          this.imageName = "";
          this.imageName2 = '';
          this.showSuccess(res.message)

        },
        (err) => {
          this.Message(err.error.message)
        }
      );

    }
  }

}
