import { Component, DOCUMENT, Inject, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../../services/api-service';
import { TranslateService } from '@ngx-translate/core';
import { ParentRegion } from '../../../../model/ParentRegion';

@Component({
  selector: 'app-create-project',
  standalone: false,
  templateUrl: './create-project.html',
  styleUrl: './create-project.scss'
})
export class CreateProject {
projectForm!: FormGroup;
  selectedregion = '';
  selectedtype = '';
  selectedstatus = '';
  selectedfeatures = '';
  imageName: string = 'choose file to upload';
  imageName2: string = 'choose files to upload ';
  image!: File;
  filelist!: File[];
  image2!: FileList;
  pdfName: string = '';
  pdf!: File;
  isLoading: boolean = false;
  region:ParentRegion[] = [];
  
  constructor(
    private api: ApiService,
    private fb: FormBuilder
  ) {


  }
  ngOnInit() {
this.initializeForm();
    this.api.getProjectRegions().subscribe((data:ParentRegion[])=>{
      this.region=data
    })
  }
      initializeForm(): void {
    this.projectForm = this.fb.group({
      english_name: ['', Validators.required],
      arabic_name: ['', Validators.required],
      main_image: [null],
      region_id: this.selectedregion,
      types: this.selectedtype,
      status: this.selectedstatus,
      facilities: this.selectedfeatures,
      arabic_description: [''],
      detenglish: [''],
      gallery_images: [null],
      pdf: [null],

    });
  }
onSelected(value: string): void {
    this.selectedregion = value;
  }
  createproject() {
       if (this.projectForm.valid) {
      this.isLoading = true;
      let newregion: any = {
        region_id: this.selectedregion,
        english_name: this.projectForm.value.english_name,
        arabic_name: this.projectForm.value.arabic_name,
      };
        let formData: any = new FormData();
           for (const key in newregion) {
        if (newregion.hasOwnProperty(key)) {
          const value = newregion[key];

          if (typeof value === 'string' || typeof value === 'boolean') {
            formData.append(key, value);
          } else if (value instanceof File) {
            formData.append(key, value);
          } else {
            console.warn(`Unsupported data type for key: ${key}`);
          }
        }
      }
this.api.addRegion(formData).subscribe(
        (res: any) => {
            this.projectForm.reset();
          this.isLoading = false;
          console.log("done")
          
        }
      );
 
    }
  }

  onImageChange(event: any): void {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files[0]) {
      // this.speakersForm.patchValue({ image: fileInput.files[0] });
      this.image = fileInput.files[0];
      const fileName = fileInput.files[0].name;
      this.imageName = fileName;
    }
  }
  onImageChangepartners(event: any): void {
    const fileInput2 = event.target as HTMLInputElement;
    if (fileInput2?.files && fileInput2.files.length > 0) {
      this.image2 = fileInput2.files;
    }
    this.filelist = [];
    for (let index = 0; index < this.image2.length; index++) {
      const element = this.image2[index];
      this.filelist.push(element);
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


}
