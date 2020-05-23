import { Injectable } from "@angular/core";
import { WebrequestService } from "./webrequest.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TaskService {
  userID: string;

  constructor(private webRequestService: WebrequestService) {}

  /*
   * GET baseURL/lists
   */
  getList() {
    this.userID = localStorage.getItem("userID");
    return this.webRequestService.getListsData("lists", this.userID);
  }

  /*
   * POST baseURL/lists/create
   */
  createList(title: String) {
    this.userID = localStorage.getItem("userID");
    return this.webRequestService.postData("lists/create", {
      title: title,
      userID: this.userID
    });
  }

  /*
   * GET baseURL/lists/:listID/tasks
   */
  getTasks(listID: string) {
    return this.webRequestService.getTasksData(`lists/${listID}/tasks`);
  }

  /*
   * POST baseURL/lists/:listID/tasks
   */
  createTask(title: string, listID: string) {
    return this.webRequestService.postData(`lists/${listID}/tasks`, { title });
  }

  /*
   * PATCH baseURL/lists/:listID/tasks/:taskID/complete
   */
  completeTask(task: any) {
    return this.webRequestService.patchData(
      `lists/${task._listID}/tasks/${task._id}/complete`,
      {
        completed: !task.completed
      }
    );
  }

  /*
   * PATCH baseURL/lists/:listID/tasks/:taskID/important
   */
  markAsImportant(task: any) {
    return this.webRequestService.patchData(
      `lists/${task._listID}/tasks/${task._id}/important`,
      {
        isImportant: !task.isImportant
      }
    );
  }

  /*
   *  PATCH baseURL/lists/:listID
   */
  updateList(listID: string, title: string): Observable<any> {
    this.userID = localStorage.getItem("userID");
    return this.webRequestService.patchData(`lists/${listID}`, {
      title: title,
      userID: this.userID
    });
  }

  /*
   *  POST baseURL/lists/:listID
   */
  deleteList(listID: string): Observable<any> {
    this.userID = localStorage.getItem("userID");
    return this.webRequestService.deleteListData(
      `lists/${listID}`,
      this.userID
    );
  }

  /*
   * POST baseURL/lists/:listID/tasks/:taskID
   */
  delTask(taskID: string, listID: string): Observable<any> {
    return this.webRequestService.deleteTaskData(
      `lists/${listID}/tasks/${taskID}`
    );
  }

  /*
   *  PATCH baseURL/lists/:listID/tasks/:taskID
   */
  updateTask(taskID: string, listID: string, title: string): Observable<any> {
    return this.webRequestService.patchData(`lists/${listID}/tasks/${taskID}`, {
      title
    });
  }

  /*
   *  GET baseURL/lists/:listID/tasks/:taskID
   */
  getTaskTitle(taskID: string, listID: string): Observable<any> {
    return this.webRequestService.getTasksData(
      `lists/${listID}/tasks/${taskID}`
    );
  }

  /*
   *  GET baseURL/lists/:listID/tasks/:taskID/get-description
   */
  getTaskDescription(taskID: string, listID: string): Observable<any> {
    return this.webRequestService.getTasksData(
      `lists/${listID}/tasks/${taskID}/get-description`
    );
  }

  /*
   * PATCH baseURL/lists/:listID/tasks/:taskID/add-description
   */
  addTaskDescription(
    taskID: string,
    listID: string,
    description: string
  ): Observable<any> {
    return this.webRequestService.patchData(
      `lists/${listID}/tasks/${taskID}/add-description`,
      {
        description: description
      }
    );
  }

  /*
   * PATCH baseURL/lists/:listID/tasks/:taskID/add-deadline
   */
  addDeadLine(
    taskID: string,
    listID: string,
    startingDate: string,
    endingDate: string,
    priority
  ): Observable<any> {
    return this.webRequestService.patchData(
      `lists/${listID}/tasks/${taskID}/add-deadline`,
      {
        startingDate: startingDate,
        endingDate: endingDate,
        priority: priority
      }
    );
  }

  /*
   * GET /lists/:listID/tasks/:taskID/get-deadline
   */
  getDeadline(taskID: string, listID: string): Observable <any> {
    return this.webRequestService.getTasksData(`lists/${listID}/tasks/${taskID}/get-deadline`);
  }

  /*
   * PATCH /lists/:listID/tasks/:taskID/set-label
   */
   setLabelTask(taskID: string, listID: string, label: string): Observable<any> {
      return this.webRequestService.patchData(`lists/${listID}/tasks/${taskID}/set-label`, {
      label
    });
  }

   /*
   * GET /lists/:listID/tasks/:taskID/get-label
   */
  getLabelTask(taskID: string, listID: string): Observable <any> {
    return this.webRequestService.getTasksData(`lists/${listID}/tasks/${taskID}/get-label`);
  }
}
