import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { TaskService } from "src/app/services/task.service";
import { NotificationsService } from "angular2-notifications";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-edit-task",
  templateUrl: "./edit-task.component.html",
  styleUrls: ["./edit-task.component.scss"],
})
export class EditTaskComponent implements OnInit {
  //New title of the task
  title: string;
  // ListID and taskID
  selectedListID: string;
  selectedTaskID: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private notifier: NotificationsService,
    private titleService: Title
  ) {
    this.titleService.setTitle("Tracker | Edit Task Name");
  }

  ngOnInit() {
    // get title of the task
    this.route.params.subscribe((params: Params) => {
      this.selectedListID = params.listID;
      this.selectedTaskID = params.taskID;
      this.taskService
        .getTaskTitle(this.selectedTaskID, this.selectedListID)
        .subscribe((task) => {
          this.title = task.title;
        });
    });
  }

  editTaskName() {
    this.taskService
      .updateTask(this.selectedTaskID, this.selectedListID, this.title)
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

  showNotification() {
    this.notifier.success("Success", "Editing the task...", {
      position: ["bottom", "right"],
      timeOut: 2000,
      animate: "fade",
      showProgressBar: true,
    });
  }
}
