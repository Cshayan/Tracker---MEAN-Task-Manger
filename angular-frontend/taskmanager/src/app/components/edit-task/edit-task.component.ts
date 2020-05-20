import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { TaskService } from "src/app/services/task.service";
import { NotificationsService } from "angular2-notifications";

@Component({
  selector: "app-edit-task",
  templateUrl: "./edit-task.component.html",
  styleUrls: ["./edit-task.component.scss"]
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
    private notifier: NotificationsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.selectedListID = params.listID;
      this.selectedTaskID = params.taskID;
      this.taskService.getTaskTitle(this.selectedTaskID, this.selectedListID).subscribe((task) => {
        this.title = task.title;
      });
    });
  }

  editTaskName() {
    this.taskService.updateTask(this.selectedTaskID, this.selectedListID, this.title).subscribe((response) => {
      if (response.success) {
        // Send notification
        this.showNotification();

        // Navigate back
        setTimeout(() => {
          this.router.navigate(['/trackers', this.selectedListID]);
        }, 3500);
    }
    });
  }

  showNotification() {
    this.notifier.success("Success", "Editing the task...", {
      position: ["bottom", "right"],
      timeOut: 3000,
      animate: "fade",
      showProgressBar: true
    });
  }
}
