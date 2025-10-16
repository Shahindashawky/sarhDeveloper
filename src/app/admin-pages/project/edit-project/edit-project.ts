import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Facilities } from '../../../../model/Facilities';
import { Region } from '../../../../model/Region';
import { ApiService } from '../../../services/api-service';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../../../model/Project';

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
  pdf!: File;
  isLoading: boolean = false;
  region: Region[] = []
  type: any;
  statu: any;
  facilite: Facilities[] = [];
  projectId!: any;

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
  this.route.params.subscribe((params) => {
      this.projectId = params['id'];
    });

  }
  ngOnInit() {
    this.initializeForm();
    this.api.getProjectRegions().subscribe((data: Region[]) => {
      this.region = data;
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
      this.api.getProjectById(this.projectId).subscribe((res:any) => {
        const project:Project=res;

      this.projectForm.patchValue({
      english_name: project.english_name,
      arabic_name: project.arabic_name,
      region_id:project.region_id,
      types: project.types.map((t: any) => t.id),
      status: project.status,
      facilities: project.facilities.map((f: any) => f.id),
      arabic_description: project.arabic_description,
      english_description: project.english_description,
        });
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
    const fileInput = event.target;
    if (fileInput.files && fileInput.files[0]) {
      this.pdf = fileInput.files[0];
      const fileName = fileInput.files[0].name;
      this.pdfName = fileName;
    }
  }

  editproject() {
    if (this.projectForm.valid) {
      this.isLoading = true;
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
        gallery_images: this.gallery_images,
        pdf: this.pdf

      };
      let formData: any = new FormData();
   for (const key in newproject) {
      if (!newproject.hasOwnProperty(key)) continue;
      const value = newproject[key];

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
console.log(this.projectForm.value);

     this.api.updateProject(this.projectId ,formData).subscribe(
        (res: any) => {
            this.projectForm.reset();
          this.isLoading = false;          
        console.log('project updated successfully');          
        },
  (err) => {
    console.error("Update failed", err);
    this.isLoading = false;
  }
      );

    }
  }
}
