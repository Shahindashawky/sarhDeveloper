import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api-service';
import { ActivatedRoute } from '@angular/router';
import { Facilities } from '../../../../model/Facilities';

@Component({
  selector: 'app-edit-facilities',
  standalone: false,
  templateUrl: './edit-facilities.html',
  styleUrl: './edit-facilities.scss'
})
export class EditFacilities {
facilitieForm!: FormGroup;
  imageName: string = 'choose file to upload';
  main_image!: File;
  isLoading: boolean = false;
  facilitieId!: string;

  constructor(
    private fb: FormBuilder,
    private api:ApiService,
    private route: ActivatedRoute
  ) {
  this.route.params.subscribe((params) => {
      this.facilitieId = params['id'];
    });
  }

  ngOnInit(): void {
 this.initializeForm();
           this.api.getFaciliteById(this.facilitieId).subscribe((res:any) => {
         const facilitie:Facilities=res;
 
       this.facilitieForm.patchValue({
       english_name: facilitie.english_name,
       arabic_name: facilitie.arabic_name    
         });
       })
  }

  initializeForm(): void {
    this.facilitieForm = this.fb.group({
      english_name: ['', Validators.required],
      arabic_name: ['', Validators.required],
      main_image: [null, Validators.required],
    });
  }

  onFileChange(event: any): void {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files[0]) {
      this.main_image = fileInput.files[0];
      const fileName = fileInput.files[0].name;
      this.imageName = fileName;
    }
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
        if (newfacilitie.hasOwnProperty(key)) {
          const value = newfacilitie[key];

          if (typeof value === 'string' || typeof value === 'boolean') {
            formData.append(key, value);
          } else if (value instanceof File) {
            formData.append(key, value);
          } else if (Array.isArray(value)) {
            for (let i = 0; i < value.length; i++) {
              formData.append(key, value[i]);
            }
           } else {
             formData.append(key, value);

          }
        }
      }
 this.api.updateFacilitie(this.facilitieId,formData).subscribe(
        (res: any) => {
            this.facilitieForm.reset();
          this.isLoading = false;          
        console.log('Facilite updated successfully');          
        },
  (err) => {
    console.error("Update failed", err);
    this.isLoading = false;
  }
      );
 
    }
  }



}
