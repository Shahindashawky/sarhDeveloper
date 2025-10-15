import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder,  private location: Location
) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: [''],
      message: ['', Validators.required],
    });
  }
      goBack() {
  this.location.back();
}
  onSubmit() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      alert('✅ تم إرسال رسالتك بنجاح');
      this.contactForm.reset();
    }
  }
}
