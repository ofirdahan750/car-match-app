import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(444, style({ opacity: 1 })),
      ]),
      transition(':leave', [animate(444, style({ opacity: 0 }))]),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  navOpen: boolean = false;

  ngOnInit() {
    window.addEventListener('resize', this.checkScreenWidth.bind(this));
  }

  checkScreenWidth() {
    if (window.innerWidth >= 500 && this.navOpen) {
      this.closeNav();
    }
  }

  toggleNav() {
    this.navOpen = !this.navOpen;
  }

  closeNav() {
    this.navOpen = false;
  }
}
