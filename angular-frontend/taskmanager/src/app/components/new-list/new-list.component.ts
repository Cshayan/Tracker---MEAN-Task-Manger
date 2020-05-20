import { Component, OnInit } from "@angular/core";
import { TaskService } from "src/app/services/task.service";
import { Router } from "@angular/router";
import { NotificationsService } from "angular2-notifications";

@Component({
  selector: "app-new-list",
  templateUrl: "./new-list.component.html",
  styleUrls: ["./new-list.component.scss"]
})
export class NewListComponent implements OnInit {
  // Title of the list
  title: string;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private notifier: NotificationsService
  ) {}

  ngOnInit() {}

  // When new list button is clicked, call this function
  createNewList() {
    this.taskService.createList(this.title).subscribe((response: any) => {
      // Send notification
      this.showNotification();

      // Now we redirect to tracker/response._id i.e we redirect with the newly created list selected
      setTimeout(() => {
        this.router.navigate(["/trackers", response._id]);
      }, 3500);
    });
  }

  showNotification() {
    this.notifier.success("Success", "Creating the list...", {
      position: ["bottom", "right"],
      timeOut: 3000,
      animate: "fade",
      showProgressBar: true
    });
  }
}
