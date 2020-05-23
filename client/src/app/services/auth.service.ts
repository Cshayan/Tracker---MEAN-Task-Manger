import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { WebrequestService } from "./webrequest.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  baseURL: string = "http://localhost:3000";
  userID: string;

  constructor(
    private http: HttpClient,
    private webRequestService: WebrequestService
  ) {}

  // Register a user
  /* POST baseURL/users/register */
  registerUser(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseURL}/users/register`, {
      name,
      email,
      password,
    });
  }

  // Login a user
  /* POST baseURL/users/login */
  loginUser(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseURL}/users/login`, {
      email,
      password,
    });
  }

  // Save userID and token to local staorage
  saveToLocalStorage(userID: string, token: string) {
    localStorage.setItem("userID", userID);
    localStorage.setItem("token", token);
  }

  // Check if user is logged in or not
  isLoggedIn() {
    if (localStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  }

  // Logout the user
  logOut() {
    localStorage.removeItem("userID");
    localStorage.removeItem("token");
  }

  // Verify the token from email
  /* POST baseURL/verify */
  verify(email: string, verifyToken: string): Observable<any> {
    return this.http.post(`${this.baseURL}/verify`, {
      email: email,
      verifyToken: verifyToken,
    });
  }

  //User details
  /* POST users/details */
  userDetails(): Observable<any> {
    this.userID = localStorage.getItem("userID");
    return this.http.post(`${this.baseURL}/users/details`, {
      userID: this.userID,
    });
  }
}
