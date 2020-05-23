import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { TaskService } from "src/app/services/task.service";
import { NotificationsService } from "angular2-notifications";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-edit-list",
  templateUrl: "./edit-list.component.html",
  styleUrls: ["./edit-list.component.scss"],
})
export class EditListComponent implements OnInit {
  //New title of the list
  title: string;
  listID: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private notifier: NotificationsService,
    private titleService: Title
  ) {
    this.titleService.setTitle("Tracker | Edit List Name");
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.listID = params.listID;
    });
  }

  // Function to edit the list name
  editListName() {
    this.taskService
      .updateList(this.listID, this.title)
      .subscribe((response) => {
        if (response.success) {
          this.notifier.success("Success", "Editing list name...", {
            position: ["bottom", "right"],
            timeOut: 2000,
            animate: "fade",
            showProgressBar: true,
          });
          setTimeout(() => {
            this.router.navigate(["/trackers", this.listID]);
          }, 3500);
        }
      });
  }
}
