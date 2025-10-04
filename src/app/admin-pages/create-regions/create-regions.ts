import { Component, DOCUMENT, Inject, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../services/api-service';
import { ParentRegion } from '../../../model/ParentRegion';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-regions',
  standalone: false,
  templateUrl: './create-regions.html',
  styleUrl: './create-regions.scss'
})
export class CreateRegions {
  regionForm!: FormGroup;
  selectedparentregion = '';
  imageName: string = 'choose file to upload';
  main_image!: File;
  isLoading: boolean = false;
  parentregion:ParentRegion[] = [];

  constructor(
    private fb: FormBuilder,
    private api:ApiService,private translate: TranslateService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.translate.use('en');
    this.document.documentElement.dir =  'ltr';

  }

  ngOnInit(): void {
    this.regionForm = this.fb.group({
      parent_id: [null],
      english_name: ['', Validators.required],
      arabic_name: ['', Validators.required],
      english_features:[''],
      arabic_features:[''],
      main_image: [null],

    });
    this.api.getRegions().subscribe((data:ParentRegion[])=>{
      this.parentregion=data
    })
  }
  onSelected(value: string): void {
    this.selectedparentregion = value;
  }
 

  onSubmit(): void {
    if (this.regionForm.valid) {
      this.isLoading = true;
      let newregion: any = {
        parent_id: this.selectedparentregion,
        english_name: this.regionForm.value.english_name,
        arabic_name: this.regionForm.value.arabic_name,
        main_image: this.main_image,
        english_features:this.regionForm.value.english_features,
        arabic_features:this.regionForm.value.arabic_features
      };
        let formData: any = new FormData();
      for (const key in newregion) {
        if (newregion.hasOwnProperty(key)) {
          const value = newregion[key];

          if (typeof value === 'string') {
            formData.append(key, value);
          } else if (value instanceof File) {
            formData.append(key, value);
          } else if (
            Array.isArray(value) &&
            value.every((ele) => ele instanceof File)
          ) {
            for (let i = 0; i < value.length; i++) {
              formData.append(key, value[i]);
            }
          } else if (Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value);
          }
        }
      }
this.api.addRegion(formData).subscribe(
        (res: any) => {
          if (res.success == true) {
            this.regionForm.reset();
          }
          this.isLoading = false;
        }
      );
 
    }
  }

  onFileChange(event: any): void {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files[0]) {
      this.main_image = fileInput.files[0];
      const fileName = fileInput.files[0].name;
      this.imageName = fileName;
    }
  }


  
}
