import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-create-regions',
  standalone: false,
  templateUrl: './create-regions.html',
  styleUrl: './create-regions.scss'
})
export class CreateRegions {
  regionForm!: FormGroup;
  selectedparentregion = '';
  imageName: string = 'choose file to upload 270*216 px';
  image!: File;
  isLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private api:ApiService
  ) {}

  ngOnInit(): void {
    this.regionForm = this.fb.group({
      parentregionId: [null, Validators.required],
      Enname: ['', Validators.required],
      Arname: ['', Validators.required],
      image: [null],

    });
  }
  onSelected(value: string): void {
    this.selectedparentregion = value;
  }
 

  onSubmit(): void {
    if (this.regionForm.valid) {
      this.isLoading = true;
      let newspeaker: any = {
        parentregionId: this.selectedparentregion,
        Enname: this.regionForm.value.name,
        Arname: this.regionForm.value.title,
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
      // this.regionForm.patchValue({ image: fileInput.files[0] });
      this.image = fileInput.files[0];
      const fileName = fileInput.files[0].name;
      this.imageName = fileName;
    }
  }


  
}
