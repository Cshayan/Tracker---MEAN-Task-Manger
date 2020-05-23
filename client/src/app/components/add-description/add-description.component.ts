import { Component, OnInit } from "@angular/core";
import { TaskService } from "src/app/services/task.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NotificationsService } from "angular2-notifications";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-add-description",
  templateUrl: "./add-description.component.html",
  styleUrls: ["./add-description.component.scss"],
})
export class AddDescriptionComponent implements OnInit {
  // Title and Description of the task
  title: string;
  description: string;

  // ListID and TaskID
  selectedListID: string;
  selectedTaskID: string;

  isSaved: boolean;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private notifier: NotificationsService,
    private router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle("Tracker | Add Description");
    this.isSaved = true;
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.selectedListID = params.listID;
      this.selectedTaskID = params.taskID;
    });

    // Getb the task title and add it in DOM
    this.taskService
      .getTaskDescription(this.selectedTaskID, this.selectedListID)
      .subscribe((response) => {
        this.title = response.msg[0].title;
        this.description = response.msg[0].description;
      });
  }

  // When save description button is clicked, run it
  addDescription() {
    this.taskService
      .addTaskDescription(
        this.selectedTaskID,
        this.selectedListID,
        this.description
      )
      .subscribe((response) => {
        if (response.success) {
          this.isSaved = true;
          this.showNotification("success", response.msg);
        } else {
          this.showNotification("error", "Description cannot be saved now!");
        }
      });
  }

  // On content of description change
  onChange() {
    this.isSaved = false;
  }

  // GoBack function
  goBack() {
    if (!this.isSaved) {
      alert("You have not saved the changes");
    } else {
      this.router.navigate(["/trackers", this.selectedListID]);
    }
  }

  /** Utility Function **/
  showNotification(type: string, message: string) {
    if (type === "success") {
      this.notifier.success("Saved!", message, {
        position: ["bottom", "right"],
        timeOut: 2000,
        animate: "fade",
        showProgressBar: true,
      });
    } else {
      this.notifier.error("Error", message, {
        position: ["bottom", "right"],
        timeOut: 3000,
        animate: "fade",
        showProgressBar: true,
      });
    }
  }
}
