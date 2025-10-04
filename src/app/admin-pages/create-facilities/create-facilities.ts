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
  selector: 'app-create-facilities',
  standalone: false,
  templateUrl: './create-facilities.html',
  styleUrl: './create-facilities.scss'
})
export class CreateFacilities {
facilitieForm!: FormGroup;
  imageName: string = 'choose file to upload 270*216 px';
  main_image!: File;
  isLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private api:ApiService,private translate: TranslateService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.translate.use('en');
    this.document.documentElement.dir =  'ltr';

  }

  ngOnInit(): void {
 this.initializeForm()
  }

  initializeForm(): void {
    this.facilitieForm = this.fb.group({
      english_name: ['', Validators.required],
      arabic_name: ['', Validators.required],
      main_image: [null],

    });
  }

  onSubmit(): void {
    if (this.facilitieForm.valid) {
      this.isLoading = true;
      let newfacilitie: any = {
        english_name: this.facilitieForm.value.english_name,
        arabic_name: this.facilitieForm.value.arabic_name,
        main_image: this.main_image,

      };
      let formData: any = new FormData();

      for (const key in newfacilitie) {
        console.log(key);
        if (newfacilitie.hasOwnProperty(key)) {
          const value = newfacilitie[key];

          if (typeof value === 'string' || typeof value === 'boolean') {
            formData.append(key, value);
          } else if (value instanceof File) {
            formData.append(key, value);
          } else {
            console.warn(`Unsupported data type for key: ${key}`);
          }
        }
      }
 this.api.addFacilitie(formData).subscribe(
        (res: any) => {
          if (res.success == true) {
            this.facilitieForm.reset();
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
