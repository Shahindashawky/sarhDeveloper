import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParentRegion } from '../../../../model/ParentRegion';
import { ApiService } from '../../../services/api-service';
import { ActivatedRoute } from '@angular/router';
import { Region } from '../../../../model/Region';
import { MessageService } from 'primeng/api';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-edit-regions',
  standalone: false,
  templateUrl: './edit-regions.html',
  styleUrl: './edit-regions.scss'
})
export class EditRegions {
  regionForm!: FormGroup;
  imageName: string = 'choose file to upload by KB';
  main_image!: any;
  parentregion: ParentRegion[] = [];
  regionId!: any;

  constructor(private loadingService: LoadingService,
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute, private messageService: MessageService
  ) {
    this.route.params.subscribe((params) => {
      this.regionId = params['id'];
    });
  }

  ngOnInit(): void {
    this.loadingService.show();
    this.initializeForm();
    this.getdata();
    this.api.getRegionById(this.regionId).subscribe((res: any) => {
      const region: Region = res;

      this.regionForm.patchValue({
        parent_id: region.parent_id,
        english_name: region.english_name,
        arabic_name: region.arabic_name,
        english_features: region.english_features,
        arabic_features: region.arabic_features,

      });
    })
  }
  getdata() {
    this.loadingService.show();
    this.api.getRegionsexcept(this.regionId).subscribe((data: ParentRegion[]) => {
      this.parentregion = data;
      this.loadingService.hide();
    })
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
  initializeForm(): void {
    this.regionForm = this.fb.group({
      parent_id: [null],
      english_name: ['', Validators.required],
      arabic_name: ['', Validators.required],
      english_features: [''],
      arabic_features: [''],
      main_image: [null],

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
         this.regionForm.markAllAsTouched();
  if (this.regionForm.invalid) {
    this.showWarn('Please fill all required fields.');
    return;
  }
    if (this.regionForm.valid) {
      let newregion: any = {
        parent_id: this.regionForm.value.parent_id,
        english_name: this.regionForm.value.english_name,
        arabic_name: this.regionForm.value.arabic_name,
        main_image: this.main_image,
        english_features: this.regionForm.value.english_features,
        arabic_features: this.regionForm.value.arabic_features
      };
      let formData: any = new FormData();
     for (const key in newregion) {
  if (newregion.hasOwnProperty(key)) {
    const value = newregion[key];
    if (key === 'main_image' && !(value instanceof File)) {
      continue;
    }

    if (key === 'parent_id' && (value === null || value === undefined || value === '')) {
      continue;
    }

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
      this.api.updateRegion(this.regionId, formData).subscribe(
        (res: any) => {
          this.regionForm.reset();
          this.imageName = '';
          this.showSuccess(res.message)
        },
        (err) => {
          this.Message(err.error.message)
        }
      );

    }
  }



}
