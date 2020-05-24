import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NotificationsService } from "angular2-notifications";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  isNavActive: boolean = false;
  userName;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notifier: NotificationsService
  ) {}

  ngOnInit() {
    this.authService.userDetails().subscribe((response) => {
      this.userName = response.name;
    });
  }

  logOutClick() {
    this.authService.logOut();
    this.notifier.info("Wait", "Logging you out...", {
      position: ["bottom", "right"],
      timeOut: 2000,
      animate: "fade",
      showProgressBar: true,
      clickIconToClose: true,
    });
    setTimeout(() => {
      this.router.navigate(["/login"]);
    }, 2500);
  }

  onBurgerClick() {
    this.isNavActive = !this.isNavActive;
  }
}
