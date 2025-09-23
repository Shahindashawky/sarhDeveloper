import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-create-features',
  standalone: false,
  templateUrl: './create-features.html',
  styleUrl: './create-features.scss'
})
export class CreateFeatures {
featureForm!: FormGroup;
  imageName: string = 'choose file to upload 270*216 px';
  image!: File;
  isLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private api:ApiService
  ) {}

  ngOnInit(): void {

  }

  initializeForm(): void {
    this.featureForm = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      image: [null],

    });
  }

  onSubmit(): void {
    if (this.featureForm.valid) {
      this.isLoading = true;
      let newspeaker: any = {
        name: this.featureForm.value.name,
        title: this.featureForm.value.title,
        image: this.image,
      };
      let formData: any = new FormData();

      for (const key in newspeaker) {
        console.log(key);
        if (newspeaker.hasOwnProperty(key)) {
          const value = newspeaker[key];

          if (typeof value === 'string' || typeof value === 'boolean') {
            formData.append(key, value);
          } else if (value instanceof File) {
            formData.append(key, value);
          } else {
            console.warn(`Unsupported data type for key: ${key}`);
          }
        }
      }

 
    }
  }

  onFileChange(event: any): void {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files[0]) {
      // this.featureForm.patchValue({ image: fileInput.files[0] });
      this.image = fileInput.files[0];
      const fileName = fileInput.files[0].name;
      this.imageName = fileName;
    }
  }


}
