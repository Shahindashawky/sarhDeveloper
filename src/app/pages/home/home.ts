import { ApiService } from './../../services/api-service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
 projects:any;

    responsiveOptions: any[] | undefined;

    constructor(private ApiService: ApiService) {}

    ngOnInit() {
     this.projects = [
  {
    title: 'النرجس الجديدة',
    img: '/images/build2.png',
  },
  {
    title: 'نورت هاوس',
    img: '/images/building.png',
  },
  {
    title: 'بيت الوطن',
    img: '/images/build3.png',
  }
];


        this.responsiveOptions = [
            {
                breakpoint: '1400px',
                numVisible: 2,
                numScroll: 1,
            },
            {
                breakpoint: '1199px',
                numVisible: 2,
                numScroll: 1,
            },
            {
                breakpoint: '767px',
                numVisible: 2,
                numScroll: 1,
            },
            {
                breakpoint: '575px',
                numVisible: 1,
                numScroll: 1,
            },
        ];
    }

 
}
