import { Component, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-counters',
  standalone: false,
  templateUrl: './counters.html',
  styleUrl: './counters.scss'
})
export class Counters {
  counters: any;

  constructor(private translate: TranslateService
  ) { }
  started = false;

  @HostListener('window:scroll', [])
  onScroll() {
    const section = document.querySelector('.stats');
    if (!section) return;

    const top = section.getBoundingClientRect().top;
    if (top < window.innerHeight && !this.started) {
      this.startCounters();
      this.started = true;
    }
  }

  ngOnInit(): void {
    this.count()
    this.translate.onLangChange.subscribe(() => {
      this.count()
      this.startCounters();

    });
  }
  count() {
    this.counters = [
      { label: this.translate.instant('year-exp'), value: 0, target: 10 },
      { label: this.translate.instant('client'), value: 0, target: 150 },
      { label: this.translate.instant('project'), value: 0, target: 80 },
    ]
  }
  startCounters() {
    this.counters.forEach((counter: any) => {
      let current = 0;
      const duration = 2000;
      const steps = 60;
      const increment = counter.target / steps;
      const delay = duration / steps;

      const interval = setInterval(() => {
        current += increment;
        counter.value = Math.ceil(current);

        if (counter.value >= counter.target) {
          counter.value = counter.target;
          clearInterval(interval);
        }
      }, delay);
    });
  }
}

