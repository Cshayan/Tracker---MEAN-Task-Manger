import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { TaskService } from "src/app/services/task.service";
import { NotificationsService } from "angular2-notifications";
import {Title} from "@angular/platform-browser";

@Component({
  selector: "app-tracker-view",
  templateUrl: "./tracker-view.component.html",
  styleUrls: ["./tracker-view.component.scss"]
})
export class TrackerViewComponent implements OnInit {

  // List and Task array
  lists: any[];
  tasks: any[];
  hasTask = false;
  disabled = true;

  // Title of the list
  title: string;
  selectedListID: string;

  priority: string;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
    private notifier: NotificationsService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Tracker');
  }

  // On component load, get the lists and corresponding tasks of the list
  ngOnInit() {
    // Check the url on every change of it
    this.route.params.subscribe((params: Params) => {
      // Get tasks of every lists clicked
      if (params.listID) {
        this.taskService.getTasks(params.listID).subscribe((tasks: any[]) => {
          this.tasks = tasks;
          this.selectedListID = params.listID;

          // Check if the task is actually present or not, and thus display appropiate message in UI
          if (this.tasks.length) this.hasTask = true;
          else this.hasTask = false;
        });
      }

      // If the current url is /tracker, then make the create task button disabled, otherwise make it enable
      if (this.router.url === "/tracker") {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    });

    // Get all lists from DB
    this.taskService.getList().subscribe((lists: any[]) => {
      this.lists = lists;
    });
  }

  //Call this function when a task is clicked to toggle the state of completed
  taskClick(task: any) {
    this.taskService.completeTask(task).subscribe((response: Object) => {
      task.completed = !task.completed;
    });

    // Show the notification
    this.showNotification(task);
  }

  // Delete List function
  deleteListName() {
    if (confirm("Are you sure you want to delete the list ?")) {
      this.taskService.deleteList(this.selectedListID).subscribe(response => {
        if (response.success) {
          this.showTypeNotification("success", "Deleting list...");
          setTimeout(() => {
            this.router.navigate(["/tracker"]);
          }, 3500);
        }
      });
    }
  }

  // Mark Important function
  markImportant(task: any) {
    this.taskService.markAsImportant(task).subscribe((response: Object) => {
      task.isImportant = !task.isImportant;

      if (task.isImportant) {
        this.showTypeNotification("success", "Task Marked Important");
      } else {
        this.showTypeNotification("success", "Task Marked Unimportant");
      }
    });
  }

  // Delete task function
  deleteTask(taskID: string) {
    if (confirm("Are you sure you want to delete the task ?")) {
      this.taskService
        .delTask(taskID, this.selectedListID)
        .subscribe(response => {
          if (response.success) {
            this.showTypeNotification("success", "Deleting the task...");
            setTimeout(() => {
              this.router.navigate(["/tracker"]);
            }, 3500);
          }
        });
    }
  }

  // Function to show notification
  showNotification(task: any) {
    if (!task.completed) {
      this.notifier.success("Success", "Task Marked", {
        position: ["bottom", "right"],
        timeOut: 2000,
        animate: "fade",
        showProgressBar: true
      });
    } else {
      this.notifier.alert("Alert", "Task Unmarked", {
        position: ["bottom", "right"],
        timeOut: 2000,
        animate: "fade",
        showProgressBar: true
      });
    }
  }

  // Function to show type of notification message
  showTypeNotification(type: string, message: string) {
    if (type === "success") {
      this.notifier.success("Success", message, {
        position: ["bottom", "right"],
        timeOut: 3000,
        animate: "fade",
        showProgressBar: true
      });
    }
  }
}
