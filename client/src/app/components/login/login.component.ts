import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { NotificationsService } from "angular2-notifications";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  // Login Form fields
  emailForm: string;
  passwordForm: string;
  disable: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notifier: NotificationsService,
    private titleService: Title
  ) {
    this.titleService.setTitle("Tracker | Login to your account");
    this.disable = false;
  }

  ngOnInit() {
    const token = localStorage.getItem("token");
    if (token) {
      this.router.navigate(["/tracker"]);
    }
  }

  // When login button is clicked, call it
  onLoginClick() {
    this.disable = true;
    this.authService
      .loginUser(this.emailForm, this.passwordForm)
      .subscribe((response) => {
        // If user logs in successfully
        if (response.success) {
          this.authService.saveToLocalStorage(response.id, response.token);
          this.showNotification("success", "Logging in to your account...");
          setTimeout(() => {
            this.router.navigate(["/tracker"]);
          }, 2500);
        } else {
          // If there is some error
          this.showNotification("error", response.msg);
          this.disable = false;
        }
      });
  }

  /*** Notification Functions ***/
  showNotification(type: string, message: string) {
    // determine the type of notification to send
    if (type === "success") {
      this.notifier.info("Success", message, {
        position: ["bottom", "right"],
        timeOut: 2000,
        animate: "fade",
        showProgressBar: true,
        clickIconToClose: true,
      });
    } else {
      this.notifier.error("Error", message, {
        position: ["bottom", "right"],
        timeOut: 4000,
        animate: "rotate",
        showProgressBar: true,
        clickIconToClose: true,
      });
    }
  }
}
