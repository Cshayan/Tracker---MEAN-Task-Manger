import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NotificationsService } from "angular2-notifications";
import { TaskService } from "src/app/services/task.service";
import { EmailService } from "src/app/services/email.service";
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: "app-email-task",
  templateUrl: "./email-task.component.html",
  styleUrls: ["./email-task.component.scss"]
})
export class EmailTaskComponent implements OnInit {
  //Receiver email
  email: string;
  re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //ListID and taskID
  selectedListID: string;
  selectedTaskID: string;

  //TaskTitle
  taskTitle: string;
  sendingDate: string;

  constructor(
    private router: Router,
    private notifier: NotificationsService,
    private route: ActivatedRoute,
    private taskService: TaskService,
    private emailService: EmailService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.selectedListID = params.listID;
      this.selectedTaskID = params.taskID;
      this.taskService.getTaskTitle(this.selectedTaskID, this.selectedListID).subscribe((task) => {
        this.taskTitle = task.title;
      });
    });
    this.authService.userDetails().subscribe((response) => {
      this.email = response.email;
    });
  }

  // Send email function
  sendEmail() {
    if (
      this.checkValidEmail(this.email) &&
      this.checkDateValid(this.sendingDate)
    ) {
      // If email is valid and date is valid

      // Step - 1 :- Get the title of the task
      this.taskService
        .getTaskTitle(this.selectedTaskID, this.selectedListID)
        .subscribe(task => {
          this.taskTitle = task.title;
          this.sendNotification("info", "A mail will be sent to the date mentioned.");

          // Step - 2 :- Send mail with the task title as the content
          this.emailService
            .mailTaskReminder(this.taskTitle, this.email, this.sendingDate)
            .subscribe(response => {
              if (response.success) {
                this.sendNotification(
                  "success",
                  response.msg
                );
                setTimeout(() => {
                  this.router.navigate(["/trackers", this.selectedListID]);
                }, 4500);
              } else {
                this.sendNotification(
                  "error",
                  "Email cannot be send right now. Please try again later."
                );
              }
            });
        });
    } else {
      // Email is not valid
      this.sendNotification("error", "Invalid email or date provided");
    }
  }

  // Utility Function
  checkValidEmail(email: string) {
    return this.re.test(email);
  }

  checkDateValid(sendingDate: string) {
    var timestampAfter3days = new Date().getTime() + 3 * 24 * 60 * 60 * 1000;
    var sendingDateTimestamp = new Date(this.sendingDate).getTime();
    var previousDateTimeStamp = new Date(Date.now() - 864e5).getTime();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    var newToday = yyyy + "-" + mm + "-" + dd;

    if (sendingDate === newToday) {
      return false;
    }

    if (
      sendingDateTimestamp < timestampAfter3days &&
      sendingDateTimestamp > previousDateTimeStamp
    ) {
      return true;
    } else {
      return false;
    }
  }

  sendNotification(type: string, message: string) {
    if (type === "success") {
      this.notifier.success("Success", message, {
        position: ["bottom", "right"],
        timeOut: 4000,
        animate: "fade",
        showProgressBar: true
      });
    } else if (type === "info") {
      this.notifier.info("Wait", message, {
        position: ["bottom", "right"],
        timeOut: 4000,
        animate: "fade",
        showProgressBar: true
      });
    } else {
      this.notifier.error("Error", message, {
        position: ["bottom", "right"],
        timeOut: 4000,
        animate: "fade",
        showProgressBar: true
      });
    }
  }
}
