import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { NotificationsService } from "angular2-notifications";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  // Login Form fields
  emailForm: string;
  passwordForm: string;
  disable: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notifier: NotificationsService
  ) {
    this.disable = false;
  }

  ngOnInit() {
  }

  // When login button is clicked, call it
  onLoginClick() {
    this.disable = true;
    this.authService
      .loginUser(this.emailForm, this.passwordForm)
      .subscribe(response => {
        // If user logs in successfully
        if (response.success) {
          this.authService.saveToLocalStorage(response.id, response.token);
          this.showNotification("success", "Logging in to your account...");
          setTimeout(() => {
            this.router.navigate(["/tracker"]);
          }, 4500);
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
      this.notifier.success("Success", message, {
        position: ["bottom", "right"],
        timeOut: 4000,
        animate: "fade",
        showProgressBar: true,
        clickIconToClose: true
      });
    } else {
      this.notifier.error("Error", message, {
        position: ["bottom", "right"],
        timeOut: 4000,
        animate: "rotate",
        showProgressBar: true,
        clickIconToClose: true
      });
    }
  }
}
