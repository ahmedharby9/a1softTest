import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isLoggedIn: boolean;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.isLoggedIn = false;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        /* check if user logged in then change login button to be ENQUIRE button */
        this.isLoggedIn = !(event.urlAfterRedirects.includes('login') || event.url.includes('login'));
      }

    });
  }

}
