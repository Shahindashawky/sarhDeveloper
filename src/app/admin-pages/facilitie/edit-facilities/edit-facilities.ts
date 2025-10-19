import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api-service';
import { ActivatedRoute } from '@angular/router';
import { Facilities } from '../../../../model/Facilities';
import { MessageService } from 'primeng/api';
import { LoadingService } from '../../../services/loading.service';

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
  facilitieId!: string;

  constructor(private loadingService: LoadingService,
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute, private messageService: MessageService
  ) {
    this.route.params.subscribe((params) => {
      this.facilitieId = params['id'];
    });
  }

  ngOnInit(): void {
    this.loadingService.show();
    this.initializeForm();
    this.getdata()
  }
  getdata() {
    this.loadingService.show();

    this.api.getFaciliteById(this.facilitieId).subscribe((res: any) => {
      const facilitie: Facilities = res;
      this.facilitieForm.patchValue({
        english_name: facilitie.english_name,
        arabic_name: facilitie.arabic_name
      });
      this.loadingService.hide();
    })
  }
  initializeForm(): void {
    this.facilitieForm = this.fb.group({
      english_name: ['', Validators.required],
      arabic_name: ['', Validators.required],
      main_image: [null, Validators.required],
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
      this.api.updateFacilitie(this.facilitieId, formData).subscribe(
        (res: any) => {
          this.facilitieForm.reset();
          this.imageName = "";
          this.showSuccess(res.message)
        },
        (err) => {
          this.Message(err.error.message)
        }
      );

    }
  }



}
