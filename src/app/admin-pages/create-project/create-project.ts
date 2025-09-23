import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-create-project',
  standalone: false,
  templateUrl: './create-project.html',
  styleUrl: './create-project.scss'
})
export class CreateProject {
projectForm: FormGroup;
  selectedtype = '';
  selectedstatus = '';
  selectedfeatures = '';
  imageName: string = 'choose file to upload 1600 * 449 px';
  imageName2: string = 'choose files to upload ';
  image!: File;
  filelist!: File[];
  image2!: FileList;
  pdfName: string = '';
  pdf!: File;
  isLoading: boolean = false;
  constructor(
    private api: ApiService,
    private fb: FormBuilder,
  ) {
    this.projectForm = this.fb.group({
      // enname: ['', Validators.required],
      // arname: ['', Validators.required],
      // typeid: this.selectedtype,
      // statusid: this.selectedstatus,
      // featuresid: this.selectedfeatures,

      // detarabic: ['', Validators.required],
      // detenglish: [''],
      // banner_title: [''],
      // banner: [null],
      // partners: [null],
      // programme_dates: [[], Validators.required],
      // pdf: [null],
      // highlight: [
      //   '',
      //   [
      //     Validators.pattern(
      //       '^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|(www\\.)?){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?'
      //     ),
      //   ],
      // ],
      // material_accesscode: [''],
      // about: ['', Validators.required],
    });
  }
  ngOnInit() {

  }
onSelected(id:any){

}
  createproject() {
    if (this.projectForm.valid) {
      this.isLoading = true;
      const project: any = {
        ...this.projectForm.value,
        date: this.convertData([this.projectForm.value.date])[0],
        programme_dates: this.convertData(
          this.projectForm.value.programme_dates
        ),
        mainimage: this.image,
        otherimages: this.filelist,
        programme_pdf: this.pdf,
      };
      let formData: any = new FormData();
      for (const key in project) {
        if (project.hasOwnProperty(key)) {
          const value = project[key];

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

   
    } 
  }

  convertData(date: Date[] | any[]): string[] {
    let dateArray: any[] = [];

    for (let index = 0; index < date.length; index++) {
      const element = date[index];
      const year: number = element.getFullYear();
      const month: string = String(element.getMonth() + 1).padStart(2, '0');
      const day: string = String(element.getDate()).padStart(2, '0');

      const formattedDate: string = `${year}-${month}-${day}`;
      dateArray.push(formattedDate);
    }
    return dateArray;
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
