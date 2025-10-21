import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ApiService } from '../../services/api-service';
import { MessageService } from 'primeng/api';
import { LoadingService } from '../../services/loading.service';
import { LanguageService } from '../../services/languageservice';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  contactForm: FormGroup;
  currentLang: 'ar' | 'en' = 'ar';

  constructor(private messageService: MessageService, private langService: LanguageService, private loadingService: LoadingService, private fb: FormBuilder, private location: Location, private api: ApiService
  ) {
    this.contactForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: [''],
      message: ['', Validators.required],
    });
  }
    ngOnInit(): void {
    this.loadingService.show();
    this.langService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
      this.loadingService.hide();
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
  showInfo(message: any) {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: message });
  }
onSubmit() {
  if (this.contactForm.valid) {
    const formData = this.contactForm.getRawValue();

    this.api.sendContact(formData, this.currentLang).subscribe({
      next: (res: any) => {
        this.showSuccess(res.message);
        this.contactForm.reset();
      },
      error: (err: any) => {
        this.Message(err.error?.message || 'حدث خطأ أثناء الإرسال');
      }
    });
  }
}


}

