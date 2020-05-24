import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class EmailService {
  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = "https://tracker-api-shayan.herokuapp.com";
  }

  /* POST /mail
   * Send mail for task reminder
   */
  mailTaskReminder(
    taskTitle: string,
    receiverMail: string,
    sendingDate: string
  ): Observable<any> {
    return this.http.post(`${this.baseURL}/mail`, {
      email: receiverMail,
      title: taskTitle,
      sendingDate: sendingDate,
    });
  }
}
