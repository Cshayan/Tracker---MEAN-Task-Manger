import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NotificationsService } from "angular2-notifications";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-verify-account",
  templateUrl: "./verify-account.component.html",
  styleUrls: ["./verify-account.component.scss"]
})
export class VerifyAccountComponent implements OnInit {
  // Verifytoken and email
  verifyToken: string;
  emailForm: string;

  constructor(
    private router: Router,
    private notifier: NotificationsService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  // On verify button click, call it
  onVerifyClick() {
    if (this.verifyToken === "" || this.verifyToken === undefined) {
      this.showNotification("error", "Please fill out the field!");
      return;
    }

    // Make the request
    this.authService
      .verify(this.emailForm, this.verifyToken)
      .subscribe(response => {
        if (response.success) {
          this.showNotification('success', response.msg);
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3500);
        } else {
          console.log(response);
          this.showNotification('error', response.err);
        }
      });
  }

  /*** Utility functions  ***/
  showNotification(type: string, message: string) {
    if (type === "success") {
      this.notifier.success("Success", message, {
        position: ["bottom", "right"],
        timeOut: 3000,
        animate: "fade",
        showProgressBar: true
      });
    } else {
      this.notifier.error("Error", message, {
        position: ["bottom", "right"],
        timeOut: 3000,
        animate: "fade",
        showProgressBar: true
      });
    }
  }
}
