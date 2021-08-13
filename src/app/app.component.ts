/*********************************************************************************
 * WEB422 – Assignment 06
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
 * assignment has been copied manually or electronically from any other source (including web sites) or
 * distributed to other students.
 *
 * Name: Ha Eun Kim Student ID: 158007187 Date: Aug 13, 2021
 * Deploy URL: https://web422-assignment456.vercel.app
 * Heroku URL - api: https://murmuring-depths-86197.herokuapp.com
 *
 ********************************************************************************/
import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from './User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'web422-a4';
  searchString!: string;
  token!: any;

  constructor(private router: Router, private auth: AuthService) {}
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.token = this.auth.readToken();
      }
    });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  handleSearch(event: Event) {
    console.log(this.searchString);
    this.router.navigate(['/search'], {
      queryParams: { q: this.searchString },
    });
    this.searchString = '';
  }
}
