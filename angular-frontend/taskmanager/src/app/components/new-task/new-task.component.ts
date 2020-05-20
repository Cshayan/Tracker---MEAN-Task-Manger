import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { TaskService } from "src/app/services/task.service";
import { NotificationsService } from "angular2-notifications";

@Component({
  selector: "app-new-task",
  templateUrl: "./new-task.component.html",
  styleUrls: ["./new-task.component.scss"]
})
export class NewTaskComponent implements OnInit {
  // Title of the list
  title: string;
  // ListID
  listID: string;
  disable: boolean;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
    private notifier: NotificationsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.listID = params.listID;
    });
  }

  createNewTask() {
    this.disable = true;
    this.taskService.createTask(this.title, this.listID).subscribe(response => {
      this.showNotification('success', 'Creating the task...');

      setTimeout(() => {
        this.router.navigate(["../"], { relativeTo: this.route });
      }, 3500);
    });
  }

  showNotification(type, message) {
    if (type === "success") {
      this.notifier.success("Success", message, {
        position: ["bottom", "right"],
        timeOut: 3000,
        animate: "fade",
        showProgressBar: true
      });
    } else {
      this.notifier.error("Invalid", message, {
        position: ["bottom", "right"],
        timeOut: 3000,
        animate: "fade",
        showProgressBar: true
      });
    }
  }
}
