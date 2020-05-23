import { Component, OnInit } from "@angular/core";
import { TaskService } from "src/app/services/task.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NotificationsService } from "angular2-notifications";

@Component({
  selector: "app-set-label",
  templateUrl: "./set-label.component.html",
  styleUrls: ["./set-label.component.scss"],
})
export class SetLabelComponent implements OnInit {
  // Title and labelType of the task
  title: string;
  labelType: string;

  // ListID and TaskID
  selectedListID: string;
  selectedTaskID: string;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private notifier: NotificationsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.selectedListID = params.listID;
      this.selectedTaskID = params.taskID;
    });

    // Getb the task title and add it in DOM
    this.taskService
      .getLabelTask(this.selectedTaskID, this.selectedListID)
      .subscribe((response) => {
        this.title = response.msg[0].title;
        this.labelType = response.msg[0].label;
      });
  }

  // Function tp set the label for any task
  setLabel() {
    this.taskService
      .setLabelTask(this.selectedTaskID, this.selectedListID, this.labelType)
      .subscribe((response) => {
        if (response.success) {
          // Send notification
          this.showNotification();

          // Navigate back
          setTimeout(() => {
            this.router.navigate(["/trackers", this.selectedListID]);
          }, 2500);
        }
      });
  }

  goBack() {
    this.router.navigate(["/trackers", this.selectedListID]);
  }

  // Function show notification
  showNotification() {
    this.notifier.success("Success", "Setting the label...", {
      position: ["bottom", "right"],
      timeOut: 2000,
      animate: "fade",
      showProgressBar: true,
    });
  }
}
