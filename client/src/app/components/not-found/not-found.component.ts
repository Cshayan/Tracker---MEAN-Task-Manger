import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-not-found",
  templateUrl: "./not-found.component.html",
  styleUrls: ["./not-found.component.scss"],
})
export class NotFoundComponent implements OnInit {
  constructor(private router: Router, private titleService: Title) {
    this.titleService.setTitle("Tracker | 404 - Page Not Found");
  }

  ngOnInit() {}
}
