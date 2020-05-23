import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { RegisterComponent } from "./components/register/register.component";
import { TrackerViewComponent } from "./components/tracker-view/tracker-view.component";
import { NewListComponent } from "./components/new-list/new-list.component";
import { NewTaskComponent } from "./components/new-task/new-task.component";
import { LoginComponent } from "./components/login/login.component";
import { EditListComponent } from "./components/edit-list/edit-list.component";
import { EditTaskComponent } from "./components/edit-task/edit-task.component";
// import { EmailTaskComponent } from "./components/email-task/email-task.component";
import { AuthGuard } from "./services/auth.guard";
import { NotFoundComponent } from "./components/not-found/not-found.component";
// import { VerifyAccountComponent } from "./components/verify-account/verify-account.component";
import { AddDescriptionComponent } from "./components/add-description/add-description.component";
import { AddDateComponent } from "./components/add-date/add-date.component";
import { SetLabelComponent } from "./components/set-label/set-label.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  {
    path: "tracker",
    component: TrackerViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "trackers/:listID",
    component: TrackerViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "tracker/new-list",
    component: NewListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "trackers/:listID/new-list",
    redirectTo: "tracker/new-list",
    canActivate: [AuthGuard],
  },
  {
    path: "tracker/new-list/tracker",
    redirectTo: "tracker",
    canActivate: [AuthGuard],
  },
  {
    path: "trackers/:listID/new-task",
    component: NewTaskComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit-list/:listID",
    component: EditListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit-list/:listID/tracker",
    redirectTo: "trackers/:listID",
    canActivate: [AuthGuard],
  },
  {
    path: "trackers/:listID/edit-task/:taskID",
    component: EditTaskComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "trackers/:listID/edit-task/:taskID/tracker",
    redirectTo: "trackers/:listID",
    canActivate: [AuthGuard],
  },
  // { path: 'trackers/:listID/email-task/:taskID', component: EmailTaskComponent , canActivate: [AuthGuard]},
  // { path: 'trackers/:listID/email-task/:taskID/tracker', redirectTo: 'trackers/:listID', canActivate: [AuthGuard] },
  // { path: "verify-account", component: VerifyAccountComponent },
  {
    path: "trackers/:listID/add-description/:taskID",
    component: AddDescriptionComponent,
  },
  {
    path: "trackers/:listID/add-description/:taskID/tracker",
    redirectTo: "trackers/:listID",
  },
  { path: "trackers/:listID/add-date/:taskID", component: AddDateComponent },
  {
    path: "trackers/:listID/add-date/:taskID/tracker",
    redirectTo: "trackers/:listID",
  },
  { path: "trackers/:listID/set-label/:taskID", component: SetLabelComponent },
  {
    path: "trackers/:listID/set-label/:taskID/tracker",
    redirectTo: "trackers/:listID",
  },
  { path: "404", component: NotFoundComponent },
  { path: "**", redirectTo: "404" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
