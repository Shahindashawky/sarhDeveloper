import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../../services/api-service';
import { Project } from '../../../../model/Project';
@Component({
  selector: 'app-create-units',
  standalone: false,
  templateUrl: './create-units.html',
  styleUrl: './create-units.scss'
})
export class CreateUnits {
  unitsForm!: FormGroup;
  imageName: string = 'choose file to upload';
  imageName2: string = 'choose files to upload ';
  main_image!: File;
  gallery_images!: File[];
  image2!: FileList;
  pdfName: string = '';
  pdf!: File;
  isLoading: boolean = false;
  project: Project[] = []
  type: any;
  status: any;

  constructor(
    private api: ApiService,
    private fb: FormBuilder
  ) {


  }
  ngOnInit() {
    this.initializeForm();
    this.api.getunitsProjects().subscribe((data: Project[]) => {
      this.project = data
    })
    this.api.getUnitsType().subscribe((data: any) => {
      this.type = data
    })
    this.api.getUnitsStatus().subscribe((data: any) => {
      this.status = data
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
      area:[''],
      rooms:[''],
      bathrooms:[''],
      price:[''],
      map_url:[''],
      english_finishing:[''],
      arabic_finishing:[''],
      english_floor:[''],
      arabic_floor:[''],
      gallery_images: [null, Validators.required],
      

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


  createunits() {
    if (this.unitsForm.valid) {
      this.isLoading = true;
      let newproject: any = {
        project_id: this.unitsForm.value.project_id?.id,
        english_name: this.unitsForm.value.english_name,
        arabic_name: this.unitsForm.value.arabic_name,
        main_image: this.main_image,
        unit_type_id: this.unitsForm.value.unit_type_id?.id,
        status: this.unitsForm.value.status?.id,
        arabic_details: this.unitsForm.value.arabic_details,
        english_details: this.unitsForm.value.english_details,
        area:this.unitsForm.value.area,
        rooms:this.unitsForm.value.rooms,
        bathrooms:this.unitsForm.value.bathrooms,
        price:this.unitsForm.value.price,
        map_url:this.unitsForm.value.map_url,
        english_finishing:this.unitsForm.value.english_finishing,
        arabic_finishing:this.unitsForm.value.arabic_finishing,
        english_floor:this.unitsForm.value.english_floor,
        arabic_floor:this.unitsForm.value.arabic_floor,
        gallery_images: this.gallery_images,

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

      this.api.addUnits(formData).subscribe(
              (res: any) => {
                  this.unitsForm.reset();
                this.isLoading = false;
                console.log("done")

              }
            );

    }
  }


}
