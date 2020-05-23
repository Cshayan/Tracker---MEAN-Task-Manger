import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  instaURL = "https://www.instagram.com/shayan.chatterjee/";
  githubURL = "https://github.com/Cshayan";
  linkedinURL = "https://www.linkedin.com/in/shayan-chatterjee-a41771167/";
  portfolioURL = "https://shayanchatterjee-portfolio.herokuapp.com/";
  year;

  ngOnInit() {
    this.year = new Date().getFullYear();
  }

  openInstagram() {
    window.open(this.instaURL, "_blank");
  }

  openGithub() {
    window.open(this.githubURL, "_blank");
  }

  openLinkedin() {
    window.open(this.linkedinURL, "_blank");
  }

  openPortfolio() {
    window.open(this.portfolioURL, "_blank");
  }


}
