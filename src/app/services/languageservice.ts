// src/app/services/language.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private langSubject = new BehaviorSubject<'ar' | 'en'>('ar');
  currentLang$ = this.langSubject.asObservable();

  setLang(lang: any) {
    this.langSubject.next(lang);
  }

  get currentLang() {
    return this.langSubject.value;
  }
}
