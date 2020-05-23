import { Component, OnInit } from "@angular/core";
import { TaskService } from "src/app/services/task.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NotificationsService } from "angular2-notifications";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-add-date",
  templateUrl: "./add-date.component.html",
  styleUrls: ["./add-date.component.scss"],
})
export class AddDateComponent implements OnInit {
  // Various properties
  taskTitle: string;
  selectedListID: string;
  selectedTaskID: string;
  startingDate: string;
  endingDate: string;
  priority: string;

  // set a list a priority and give each of them values
  priorityList: any = [
    { name: "Low", val: 1 },
    { name: "Medium", val: 2 },
    { name: "High", val: 3 },
  ];

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private notifier: NotificationsService,
    private router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle("Tracker | Add Due Date");
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.selectedListID = params.listID;
      this.selectedTaskID = params.taskID;
    });

    // Get the task name
    this.taskService
      .getTaskTitle(this.selectedTaskID, this.selectedListID)
      .subscribe((response) => {
        this.taskTitle = response.title;
      });

    // Get deadline
    this.taskService
      .getDeadline(this.selectedTaskID, this.selectedListID)
      .subscribe((response) => {
        this.startingDate = response.msg[0].startingDate;
        this.endingDate = response.msg[0].endingDate;
      });
  }

  //Radio Change
  radioChangeHandler(event: any) {
    this.priority = event.target.value;
  }

  // Add Deadline function is called here
  addDeadline() {
    if (this.checkValidDate(this.startingDate, this.endingDate)) {
      this.taskService
        .addDeadLine(
          this.selectedTaskID,
          this.selectedListID,
          this.startingDate,
          this.endingDate,
          this.priority
        )
        .subscribe((response) => {
          if (response.success) {
            this.sendNotification("success", response.msg);
            setTimeout(() => {
              this.router.navigate(["/trackers", this.selectedListID]);
            }, 2500);
          }
        });
    } else {
      // Invalid date
      this.sendNotification("error", "Invalid Date provided");
    }
  }

  // Check valid date function
  checkValidDate(startingDate: string, endingDate: string) {
    var previousDateTimeStamp = new Date(Date.now() - 864e5).getTime();
    var startingDateTimestamp = new Date(this.startingDate).getTime();
    var endingDateTimestamp = new Date(this.endingDate).getTime();

    if (startingDateTimestamp === endingDateTimestamp) {
      return true;
    }

    if (
      startingDateTimestamp > previousDateTimeStamp &&
      endingDateTimestamp > previousDateTimeStamp &&
      startingDateTimestamp < endingDateTimestamp
    ) {
      return true;
    } else {
      return false;
    }
  }

  // Function to send notification
  sendNotification(type: string, message: string) {
    if (type === "success") {
      this.notifier.success("Success", message, {
        position: ["bottom", "right"],
        timeOut: 2000,
        animate: "fade",
        showProgressBar: true,
      });
    } else if (type === "info") {
      this.notifier.info("Wait", message, {
        position: ["bottom", "right"],
        timeOut: 2000,
        animate: "fade",
        showProgressBar: true,
      });
    } else {
      this.notifier.error("Error", message, {
        position: ["bottom", "right"],
        timeOut: 4000,
        animate: "fade",
        showProgressBar: true,
      });
    }
  }
}
