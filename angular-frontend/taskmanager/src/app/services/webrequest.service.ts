import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class WebrequestService {
  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = "http://localhost:3000";
  }

  getListsData(url: string, userID: string) {
    return this.http.post(`${this.baseURL}/${url}`, { userID });
  }

  getTasksData(url: string) {
    return this.http.get(`${this.baseURL}/${url}`);
  }

  postData(url: string, payload: Object) {
    return this.http.post(`${this.baseURL}/${url}`, payload);
  }

  patchData(url: string, payload: Object) {
    return this.http.patch(`${this.baseURL}/${url}`, payload);
  }

  deleteListData(url: string, payload: Object) {
    return this.http.delete(`${this.baseURL}/${url}`, payload);
  }

  deleteTaskData(url: string) {
    return this.http.delete(`${this.baseURL}/${url}`);
  }

}
