import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { NotificationsService } from "angular2-notifications";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  // Registration Form Fields
  nameForm: string;
  emailForm: string;
  passwordForm: string;
  disable: boolean;

  constructor(
    private authService: AuthService,
    private notifier: NotificationsService,
    private router: Router
  ) {
    this.disable = false;
  }

  ngOnInit() {}

  // When register button is clicked
  onRegisterClick() {
    this.disable = true;
    this.authService
      .registerUser(this.nameForm, this.emailForm, this.passwordForm)
      .subscribe(response => {
        // If there is some error
        if (!response.success) {
          this.showNotification("error", response.err);
          this.disable = false;
        } else {
          // User registered successfully
          this.showNotification(
            "success",
            response.msg
          );
          setTimeout(() => {
            this.router.navigate(["/login"]);
          }, 4500);
        }
      });
  }

  /*** Notification Functions ***/
  showNotification(type: string, message: string) {
    // Determine type of notification to show
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
